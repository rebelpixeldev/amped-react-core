import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { default as AmpedTableComponent } from '../components/Table';
import { ImportExportData } from 'amped-react-core/Common';
import { TextCell, DateFromCell, ImageCell } from 'amped-react-core/Table/Cells';
import { SHOW_MODAL } from 'amped-react-core/Alerts/actions';
import { ITEM_SELECTED, ON_CANCEL, ON_DELETE, ON_EDIT } from '../actions';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import AmpedService from '../../Core/AmpedService';

import '../styles/_form.scss';

const _ = require('lodash');

const mapStateToProps = (state) => ({
	user : true,
	settings : state.settings,

});


class AmpedTable extends React.Component{

	/**
	 * @prop {boolean} [downloadable=true] - Whether you are able to download the current content of the form or not
	 * @prop {function} [getData] - The function that should be called to get the data to populate the table
	 * @prop {object} [materialTableProps={}] - The props to be passed to the material-ui table
	 * @prop {object} [menuItems=[]] - The items that should go in the action menu in each row
	 */
	static propTypes = {
		downloadable        : PropTypes.bool,
		getData             : PropTypes.func.isRequired,
		materialTableProps  : PropTypes.object,
		menuItems           : PropTypes.array,
		model               : PropTypes.string
	}
	static defaultProps = {
		materialTableProps : {},
		menuItems : [],
		downloadable : true
	}

	static defaultTableProps = {
		multiSelectable : true
	}

	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			page : 1,
			perpage : 20,
			loading : true,
			sourceData : [],
			modifiedData : [],
			data : [],
			headers : {}
		}
	}

	get model(){
		return this.props.params.model || this.props.model;
	}

	/**
	 * Called when the component mounts
	 * Calls `getData` on the props and sets the default state after the data has been fetched
	 * Default state is:
	 *  {
	 *		filterValue     : {string - ''},
	 *		sortOrder       : {number (1||-1) - -1},
	 *		sortColumn      : {string - null},
	 *		loading         : {bool - false},
	 *		sourceData      : {array - response from `getData`},
	 *		modifiedData    : {array - response from `getData`},
	 *		data            : {array - paginated version of response from `getData`},
	 *		headers         : {array - headers from the response}
	 *		headersVals     : {array - modified version of `headers`}
	 *	}
	 */
	componentDidMount(){
		this.props.getData()
			.then(([data, headers]) => {

				this.setState({
					filterValue : '',
					sortOrder : -1,
					sortColumn : null,
					loading : false,
					sourceData : data.response,
					modifiedData : data.response,
					data : this.paginateData(data.response),
					headers : headers.response,
					headersVals : Object.keys(headers.response)
									.map(( key ) => headers.response[key])
									.filter(( val ) => val !== 'created_at' && val !== 'updated_at')
				});
			});
	}

	componentWillReceiveProps(newProps){
		if ( typeof this.props.params.model === 'undefined' && typeof this.props.model === 'undefined' )
			throw new Error('There is no model associated with the table. You need to ensure that a model is passed either through the url or through the components props');
		this.props = newProps;
	}

	/**
	 * Handles the delete of an item
	 *
	 * @param {number} id - id of the element that you want to remove and is filtered out from the data
	 */
	handleDeleteItem(id){
		id = parseInt(id);
		this.setState({
			sourceData : this.state.sourceData.filter(( item ) => item.id !== id),
			modifiedData : this.state.modifiedData.filter(( item ) => item.id !== id),
			data : this.state.data.filter(( item ) => item.id !== id),

		})
	}

	/**
	 * Gets the component to display in a cell on the table. Handles amped convention columns created_at, updated_at, menu, and upload
	 * All the other cells are mapped to a TextCell by default with the value of `row[header]`
	 *
	 * @param {string} header - The header for the current cell
	 * @param {object} row - The data for the current row.
	 * @returns {ReactComponent}
	 */
	getCellComponent(header, row){

		if ( header === 'menu' )
			return (<TableRowMenu row={row} menuItems={this.props.menuItems} />)

		if ( typeof row[header] === 'undefined' || row[header] === null )
			return (<TextCell></TextCell>);

		if ( header === 'created_at' || header === 'updated_at' )
			return (<DateFromCell date={row[header]} />);
		if( header === 'upload' || typeof row[header].thumb_url !== 'undefined' )
			return (<ImageCell src={row[header].thumb_url} />);

		return (<TextCell>{row[header]}</TextCell>);
	}

	/**
	 * A placeholder for if the row select is ever added to AmpedTable
	 * @TODO add the ability to select a row based on material design data tables
	 *
	 * @param {number} index - The index of the row
	 */
	handleRowSelect(index){
		// this.props.dispatch({
		// 	type : ITEM_SELECTED,
		// 	item : this.props.data.slice(0).splice(index, 1)[0]
		// })
	}

	/**
	 * Slices the data to whats needed on the page
	 *
	 * @param {object} data - The data to paginate
	 * @param {number} [page = this.state.page] - The page to get the data for.
	 * @param {number} [perpage = this.state.perpage] - The amount of results perpage.
	 */
	paginateData(data, page = this.state.page, perpage = this.state.perpage){
		return data.slice((page-1) * perpage, page * perpage );
	}

	/**
	 * Callback to handle a page change
	 *
	 * @param {number|string} [page] - The current page
	 */
	handlePageChange(page){
		this.setState({
			page,
			data : this.paginateData(this.state.modifiedData, page)
		})
	}

	/**
	 * Callback to handle the change of the table filter. A React event object or a string will be
	 * passed to be used to filter the results
	 *
	 * @param {ReactEvent|string} [val] - The value that the filter hs been changed to
	 */
	handleFilterChange(val){

		const filterVal = typeof val === 'string' ? val : val.target.value.toLowerCase().trim();

		const data = filterVal === '' ?
					this.state.sourceData.slice(0) :
					this.state.sourceData.slice(0).filter(( row ) => {
						for( let i = 0, len = this.state.headersVals.length; i < len; i++ ){
							if ( row[this.state.headersVals[i]] !== null &&
								row[this.state.headersVals[i]].toString().toLowerCase().indexOf(filterVal) !== -1 )
								return true;
						}
						return false;
					});

		this.setState({
			modifiedData : data,
			filterValue : filterVal,
			data : this.paginateData(data,1),
			page : 1
		})
	}

	/**
	 * Handles the sort of a column once the header is clicked. Initial it is set to -1(desc) and alternates
	 * on each click
	 *
	 * @param {string} [header] - The name of the header that was clicked
	 */
	handleSort(header){

		const sortOrder = header === this.state.sortColumn ? this.state.sortOrder * -1 : -1;

		const dataSort = ( a, b ) => {

			if ( typeof a[header] === 'undefined' || typeof b[header] === 'undefined' )
				return 0;

			const aVal = a[header].toString();
			const bVal = b[header].toString();

			if (aVal < bVal)
				return sortOrder;
			if (aVal > bVal)
				return sortOrder*-1;
			return 0;
		}

		let orderedData = this.state.modifiedData.sort(dataSort);//_.sortBy(this.state.modifiedData.slice(0), [header]);

		this.setState({
			sortOrder,
			sortColumn : header,
			modifiedData : orderedData,
			data : this.paginateData(orderedData, 1),
			page : 1
		});
	}

	/**
	 * The callback for when the table download button is clicked. This will use the current filtered data object
	 * (modifiedData) and create a Blob object to download for the user.
	 *
	 * @TODO need to set the filename based on a model name... also have to pass the model/filename in through the props
	 */
	handleTableDownload(){
		console.log(this);

		const downloadableContent = {
			data : this.state.modifiedData,
			headers : this.state.headers
		};


		this.props.dispatch({
			type : SHOW_MODAL,
			opts : {
				content : (
					<ImportExportData model={this.model}
					                  downloadableContent={downloadableContent} />
				),

			}
		})
	}

	/**
	 * Renders the table
	 *
	 * @returns {ReactComponent}
	 */
	render(){
		const tableProps = Object.assign({}, {
			multiSelectable : true,
			onRowSelection : this.handleRowSelect.bind(this)
		}, this.props.materialTableProps);

		return (
			<AmpedTableComponent
				onPageChange={this.handlePageChange.bind(this)}
				onFilterChange={this.handleFilterChange.bind(this)}
				onDownload={this.handleTableDownload.bind(this)}
				onSort={this.handleSort.bind(this)}
				cellMap={this.getCellComponent.bind(this)}
				tableProps={tableProps}
				{...this.props}
				{...this.state} />
		);
	}

}

/**
 * The componet for the table row menu
 *
 * @param {array} [menuItems] - The menu items for the dropdown
 * @param {object} [row] - The current row data to use within the menu
 * @constructor
 */
export const TableRowMenu = ( { menuItems, row } ) => (
	<IconMenu
		iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
		anchorOrigin={{horizontal: 'left', vertical: 'top'}}
		targetOrigin={{horizontal: 'left', vertical: 'top'}}
	>
		{menuItems.map(( item, i ) => (
			<MenuItem key={i} primaryText={item.label} onTouchTap={item.onClick.bind(this, row)} />
		))}
	</IconMenu>
);

export default connect(mapStateToProps, null, null, {withRef:true})(AmpedTable);

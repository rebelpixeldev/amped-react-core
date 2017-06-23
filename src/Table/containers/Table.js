import React from 'react';
import { connect } from 'react-redux'
import { default as AmpedTableComponent } from '../components/Table'
import { TextCell, DateFromCell, ImageCell } from 'amped-react-core/Table/Cells';
import { ITEM_SELECTED, ON_CANCEL, ON_DELETE, ON_EDIT } from '../actions';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import AmpedService from '../../Core/AmpedService';

import '../styles/_form.scss';

const _ = require('lodash');

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
	user : true,
	settings : state.settings,

});


class AmpedTable extends React.Component{

	static propTypes = {
		getData : React.PropTypes.func.isRequired,
		materialTableProps : React.PropTypes.object,
		menuItems : React.PropTypes.array
	}

	static defaultProps = {
		materialTableProps : {},
		menuItems : []
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

	handleFilter(){

	}

	componentDidMount(){
		this.props.getData()
			.then(([data, headers]) => {

				this.setState({
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


	handleDeleteItem(id){
		id = parseInt(id);
		this.setState({
			sourceData : this.state.sourceData.filter(( item ) => item.id !== id),
			modifiedData : this.state.modifiedData.filter(( item ) => item.id !== id),
			data : this.state.data.filter(( item ) => item.id !== id),

		})
	}

	handleUpdateItem(id, data){

	}

	handleAddItem(data){

	}


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

	handleRowSelect(index, second){
		// this.props.dispatch({
		// 	type : ITEM_SELECTED,
		// 	item : this.props.data.slice(0).splice(index, 1)[0]
		// })
	}

	paginateData(data, page = this.state.page){
		return data.slice((page-1) * this.state.perpage, page * this.state.perpage );
	}

	handlePageChange(page){
		this.setState({
			page,
			data : this.paginateData(this.state.modifiedData, page)
		})
	}

	handleFilterChange(val){

		const filterVal = val.target.value.toLowerCase().trim();

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
			data : this.paginateData(data,1),
			page : 1
		})
	}

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


	render(){

		console.log('RENDERING', this.state.sourceData.length);
		const tableProps = Object.assign({}, {
			multiSelectable : true,
			onRowSelection : this.handleRowSelect.bind(this)
		}, this.props.materialTableProps);

		return (
			<AmpedTableComponent
				onPageChange={this.handlePageChange.bind(this)}
				onFilterChange={this.handleFilterChange.bind(this)}
				onSort={this.handleSort.bind(this)}
				cellMap={this.getCellComponent.bind(this)}
				tableProps={tableProps}
				{...this.props}
				{...this.state} />
		);
	}

}


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

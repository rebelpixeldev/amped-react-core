import React from 'react';

import { connect } from 'react-redux'
import {AmpedService, ampedSocketConnector} from "amped-react-core/Core";
import { AmpedUploadsfactory } from 'amped-react-core/Files';

import MediaLibraryComponent from '../components/MediaLibrary';

import '../styles/_media-library.scss';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings,

});

class MediaLibrary extends React.Component{

	static propTypes = {
		perpage : React.PropTypes.number
	}

	static defaultProps = {
		perpage : 21
	}


	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			loading : true,
			page : 1,
			total : 0,
			files : [],
			sourceFiles : [],
			filterSearchValue : '',
			filterTypeValue : '',
			filterTypeOptions : []
		}
	}

	componentDidMount(){
		this.getFiles();
	}

	getFiles(){
		this.setState({loading:true});
		AmpedService.get(`/api/uploads`)
			.then((resp) => {
				this.setState({loading:false});
				this.setStateFiles(resp.response, resp.response);
				this.setFilterTypes(resp.response);
			})
	}


	/*
	 * Filter, pagination and search
	 */
	setStateFiles(files, sourceFiles = null, resetPage = true){
		const updatedFiles = this.filterBySearch( this.filterByMimeType(files) );
		const state = {
			files : this.formatForPagination(updatedFiles),
			total : updatedFiles.length,

		};
		if ( resetPage )
			state.page = 1;
		if ( sourceFiles !== null )
			state.sourceFiles = sourceFiles;

		this.setState(state);
	}


	/*
	 * Filters
	 */
	// Mime filter
	handleMimeFilterChange(evt, index, val){
		this.setState({
			filterTypeValue : val
		}, () => this.setStateFiles(this.state.sourceFiles))
	}
	filterByMimeType(files, type = this.state.filterTypeValue ){
		return files.filter(( file ) => AmpedUploadsfactory.filterByType(type, file.mime) );
	}
	setFilterTypes(files){
		this.setState({
			filterTypeOptions : Object.keys(files.reduce(( ret, file ) => {
				const key = AmpedUploadsfactory.getMimeTypeByMime(file.mime);
				if ( key )
					ret[key] = true;
				return ret;
			}, {}))
		})
	}

	/*
	 * Pagination
	 */
	handlePageChange(page){
		this.setState({
			page
		}, () => this.setStateFiles(this.state.sourceFiles, null, false))
	}

	formatForPagination(files, page = this.state.page){
		return files.slice(((page-1) * this.props.perpage), ( this.props.perpage * page));
	}

	/*
	 * Search
	 */
	handleSearchFilterChange(evt, val){
		this.setState({
			filterSearchValue : val
		}, (  ) => this.setStateFiles(this.state.sourceFiles));
	}
	filterBySearch(files, search = this.state.filterSearchValue){
		search = search.toLowerCase();
		return search === '' ? files :
			files.filter(( file ) => {
				return file.extension.toLowerCase().indexOf(search) > -1 ||
						file.filename.toLowerCase().indexOf(search) > -1 ||
						file.title.toLowerCase().indexOf(search) > -1
			} )
	}


	/*
	 * Socket Listeners
	 */
	handleSocketCreate(resp){
		this.setStateFiles(resp.data.concat(this.state.files), resp.data.concat(this.state.sourceFiles));
		this.setFilterTypes(this.setFilterTypes(resp.response));

	}

	handleSocket(){
		console.log('HANDLING SOCKET');
	}

	render(){
		return (
			<MediaLibraryComponent {...this.state}
			                       {...this.props}
                                   onSearchFilterChange={this.handleSearchFilterChange.bind(this)}
			                       onPageChange={this.handlePageChange.bind(this)}
			                       onMimeFilterChange={this.handleMimeFilterChange.bind(this)} />
		)
	}

}

export default connect(mapStateToProps)(ampedSocketConnector(MediaLibrary, 'uploads'));

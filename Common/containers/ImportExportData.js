import React from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { default as ImportExportDataComponent } from '../components/ImportExportData';
import { AmpedService, AmpedUtil, AmpedSocket } from 'amped-react-core/Core';

import '../styles/_import-export.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
});

export class ImportExportData extends React.Component{


	static propTypes = {
		model               : PropTypes.string.isRequired,
		downloadableContent : PropTypes.object
	}

	state = {
		tabValue : 'import',
		importTableValue : []
	};

	constructor(props){
		super(props);
		this.props = props;
	}

	componentDidMount(){
		this.getImportTemplate();
		AmpedSocket.getSocket().on(`${this.props.model.toUpperCase()}_IMPORT_START`, this.handleSocket.bind(this))
		AmpedSocket.getSocket().on(`${this.props.model.toUpperCase()}_IMPORT_PROGRESS`, this.handleSocket.bind(this))
		AmpedSocket.getSocket().on(`${this.props.model.toUpperCase()}_IMPORT_DONE`, this.handleSocket.bind(this))
	}

	getImportTemplate(){
		AmpedService.get(`/api/${this.props.model}/import-template`)
			.then(( resp ) => {
				const data = resp.response.data
				const valueTemplate = Object.keys(data).reduce(( ret, header ) => {
					ret[data[header]] = '';
					return ret;
				}, {});

				this.setState((  ) => ({
						templateMap : data,
						valueTemplate : valueTemplate,
						importTableHeaders : Object.keys(data),
						importTableValue : Object.assign({}, valueTemplate),
						csvTemplate : resp.response.csv,

					}));
			})
	}

	// downloadData(){
	// 	const headers = Object.keys(this.state.headers);
	//
	// 	let csv = headers.slice(0) + '\n';
	//
	// 	csv += this.state.modifiedData.map(( item ) => {
	// 		return headers.map(( header ) => {
	// 			const val = item[this.state.headers[header]];
	// 			return typeof val === 'string' ? val : `"${JSON.stringify(val)}"`;
	// 		}).join(',');
	// 	}).join('\n');

		// let a = document.createElement('a');

		// if (navigator.msSaveBlob) { // IE10
		// 	navigator.msSaveBlob(new Blob([content], {
		// 		type: mimeType
		// 	}), fileName);
		// } else if (URL && 'download' in a) { //html5 A[download]
		// 	a.href = URL.createObjectURL(new Blob([csv], {
		// 		type: 'text/csv;encoding:utf-8'
	// 		}));
	// 		a.setAttribute('download', 'need-to-pass-model.csv');
	// 		document.body.appendChild(a);
	// 		a.click();
	// 		document.body.removeChild(a);
	// 	} else {
	// 		location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
	// 	}
	// }

	handleSocket(evt, data){
		console.log('SOCKETE!!', evt, data);
	}

	handleTabChange(val){
		this.setState((  ) => {
		    return { tabValue : val};
		})
	}

	handleGetTemplate(){
		AmpedUtil.download(this.state.csvTemplate, `${this.props.model}-import-template.csv`, 'text/csv');
	}

	handleImportUpload(evt){

		const body = new FormData();

		for ( let i = 0, len = evt.files.length; i < len; i++ )
			body.append('import-csv', evt.files[i]);

		AmpedService.post(`/api/${this.props.model}/import`, body)
			.then(( resp ) => {
			})
	}

	handleAddImportTableRow(){
		this.setState((  ) => ({importTableValue : [...this.state.importTableValue, Object.assign({}, this.state.valueTemplate)]}))
	}

	render(){
		return (
			<ImportExportDataComponent
				model={this.props.model}
				data={this.props.data}
				tabValue={this.state.tabValue}
				importTableHeaders={this.state.importTableHeaders}
				importTableValues={this.state.importTableValue}
				onImportUpload={this.handleImportUpload.bind(this)}
				onTabChange={this.handleTabChange.bind(this)}
			    onGetTemplate={this.handleGetTemplate.bind(this)}
			/>
		)
	}

}

export default connect(mapStateToProps)(ImportExportData);


import React from 'react';
import { connect } from 'react-redux'

import UploadButtonComponent from '../components/UploadButton'

import '../styles/_upload-button.scss';

import { AmpedService } from 'amped-react-core/Core';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings,

});



export class UploadButton extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			uploading : false
		}
	}

	handleOnChange(evt){

		this.setState({uploading : true});

		const body = new FormData();


		for ( let i = 0, len = evt.files.length; i < len; i++ )
			body.append('files[]', evt.files[i]);

		AmpedService.post('/uploads/upload', body)
			.then(( resp ) => {
				this.setState({uploading : false});
			    console.log('UPLOAD' , resp);
			})

		// this.filesService.uploadFile(body)
		// 	.then((resp) => {
		// 		this.uploading = false;
		// 		this.ampAlert.snackSuccess('', resp.response.length > 1 ? `${resp.response.length} files have been uploaded` : `${resp.response[0].title} has been uploaded`);
		// 		this.onUpload.emit(resp.response);
		// 	})
		// 	.catch((err: any) => {
		// 		this.uploading = false;
		// 		console.log(err)
		// 	});
	}

	render(){
		return (
			<UploadButtonComponent
				uploading={this.state.uploading}
				onChange={this.handleOnChange.bind(this)}
			/>
		)
	}

}

export default connect(mapStateToProps)(UploadButton);

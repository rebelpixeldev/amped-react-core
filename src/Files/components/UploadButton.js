import React from 'react';

import {LoaderButton} from 'amped-react-core/Form';

export class UploadButton extends React.Component{
	static propTypes = {
		uploading : React.PropTypes.bool,
		onChange : React.PropTypes.func
	}

	static defaultProps = {
		uploading : false,
		onChange : ()=>{}
	}

	render(){

		const progressStyle = {
			position : 'absolute',
			top: 7,
			right : 10,
		};

		return (
			<div className="amp-upload-btn ">
				<label>
					<LoaderButton label="Upload" loading={this.props.uploading} />
					<input ref="fileUpload"
					       className="amp-upload-btn__input "
					       name="files[]"
					       multiple
					       type="file"
					       onChange={() => this.props.onChange(this.refs.fileUpload) }
					/>
				</label>
			</div>
		);
	}

}

export default UploadButton;
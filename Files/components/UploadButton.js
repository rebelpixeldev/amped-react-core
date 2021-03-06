import React from 'react';

import PropTypes from 'prop-types';

import {LoaderButton} from 'amped-react-core/Form';

export class UploadButton extends React.Component{
	static propTypes = {
		uploading : PropTypes.bool,
		multiple : PropTypes.bool,
		inputName : PropTypes.string,
		onChange : PropTypes.func
	}

	static defaultProps = {
		uploading : false,
		multiple : true,
		inputName : 'files[]',
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
					       name={this.props.inputName}
					       multiple={this.props.multiple}
					       type="file"
					       onChange={() => this.props.onChange(this.refs.fileUpload) }
					/>
				</label>
			</div>
		);
	}

}

export default UploadButton;
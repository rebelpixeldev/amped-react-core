import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

export const Textarea = ( { name, label, value, formValues, onFieldChange } ) => (
	<div className="amped-form__textarea-container">
		<textarea name={name}></textarea>
	</div>
);

export const RichTextarea = ( { name, label, value, formValues, onFieldChange } ) => {

	return (
		<div className="amped-form__textarea-container">
			<label htmlFor={name} className="amped-form__label">{label}</label>
			<ReactQuill value={formValues[name]}
			            style={{marginTop:25, height:300}}
			            name={name}
			            onChange={(value) => onFieldChange(name, value) } />
		</div>
	);
}

export default RichTextarea;
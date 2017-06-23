import React from 'react';
import TextField from 'material-ui/TextField';

import { UPDATE_FIELD } from '../actions';

export const Input = ( {type, label, name, value, formValues, onFieldChange} ) => {

	const style = {
		width : '100%',
		marginTop : 0
	};

	return (
		<TextField
			type={type}
			value={typeof formValues === 'undefined'? '' : formValues[name]}
			style={style}
			name={name}
			onChange={(evt, newVal) => onFieldChange(name, newVal)}
			floatingLabelText={label} />
	);
}

Input.defaultProps = {
	type : 'text'
}

export const HiddenInput = ( {name, value } ) => (
	<input type="hidden" name={name} value={value} />
)

export const PasswordInput = ( props ) => (
	<Input type="password" {...props}  />
)
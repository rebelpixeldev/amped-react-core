import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export const Select = ( { options, name, label, value, onFieldChange } ) => {
	return (
		<SelectField
			onChange={(evt, key, payload) => onFieldChange(name, payload )}
			floatingLabelText={label}
			value={value} >
			{ options.map((option, i) => (
				<MenuItem key={i} value={option.value} primaryText={option.label} />
			))}
		</SelectField>
	);
}

export default Select;
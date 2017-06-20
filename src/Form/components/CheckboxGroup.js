import React from 'react';
import _ from 'lodash';

import Checkbox from 'material-ui/Checkbox';

export const CheckboxGroup = ( { options, name, label, value, formValues, onFieldChange } ) => {

	const onCheck = ( val, evt, isChecked ) => {
		const vals = formValues[name] === '' ? [] : formValues[name].split(',');

		onFieldChange(
			name,
			isChecked ? _.uniq([...vals, val]).join(',') :
						vals.splice(vals.indexOf(val), 1).join(',')
		);

	}

	return (
		<div className="amped-form__checkbox-group-container">
			<label htmlFor={name} className="amped-form__label">{label}</label>
			<div className="amped-form__checkbox-group">
				{options.map(( item, i ) => (
					<Checkbox
						key={i}
						label={item.label}
						onCheck={onCheck.bind(this, item.value)}
					/>
				))}
			</div>
		</div>
	);
}

export default CheckboxGroup;
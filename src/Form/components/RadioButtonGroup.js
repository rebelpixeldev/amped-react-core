import React from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export const AmpedRadioButtonGroup = ( { options, name, label, value, formValues, onFieldChange } ) => {

	return (
		<div className="amped-form__radio-group-container">
			<label htmlFor={name} className="amped-form__label">{label}</label>
			<RadioButtonGroup className="amped-form__radio-group"
			                  name={name}
			                  value={formValues[name]}
			                  onChange={(evt, value) => {
				                  console.log('change', value);
				                  onFieldChange(name, value)
			                  }}>
				{options.map(( item, i ) => (
					<RadioButton
						key={i}
						value={item.value}
						label={item.label}
					/>
				))}
			</RadioButtonGroup>
		</div>
	);
}

export default AmpedRadioButtonGroup;
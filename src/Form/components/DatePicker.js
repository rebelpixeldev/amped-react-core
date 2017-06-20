import React from 'react';

import DatePicker from 'material-ui/DatePicker';

export const AmpedDatePicker = ( { container, mode, name, label, value, formValues, minDate, maxDate, onFieldChange } ) => {

	const d = formValues[name] === '' ? new Date() : new Date(formValues[name]);

	return (
		<div>
			<label htmlFor={name} className="amped-form__label">{label}</label>
			<DatePicker container={container}
			             value={d}
			             minDate={minDate}
			             maxDate={maxDate}
			             mode={mode}
			             onChange={(evt, value) => onFieldChange(name, value)}
			             hintText={label}/>
		</div>
	)
}

AmpedDatePicker.propTypes = {
	container : React.PropTypes.string,
	formValues : React.PropTypes.any,
	mode : React.PropTypes.string,
	name : React.PropTypes.string,
	label : React.PropTypes.string,
	minDate : React.PropTypes.instanceOf(Date),
	maxDate : React.PropTypes.instanceOf(Date),
	onFieldChange : React.PropTypes.func,
	value : React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.instanceOf(Date)
	])
}

AmpedDatePicker.defaultProps = {
	container : 'inline',
	mode : 'portrait',
	minDate : new Date(),
	maxDate : null,
	onFieldChange : () => {}
}

export default AmpedDatePicker;
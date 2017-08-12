import React from 'react';

import PropTypes from 'prop-types';

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
	container       : PropTypes.string,
	formValues      : PropTypes.any,
	mode            : PropTypes.string,
	name            : PropTypes.string,
	label           : PropTypes.string,
	minDate         : PropTypes.instanceOf(Date),
	maxDate         : PropTypes.instanceOf(Date),
	onFieldChange   : PropTypes.func,
	value           : PropTypes.oneOfType([
						PropTypes.string,
						PropTypes.instanceOf(Date)
					])
}

AmpedDatePicker.defaultProps = {
	container       : 'inline',
	mode            : 'portrait',
	minDate         : new Date(),
	maxDate         : null,
	onFieldChange   : () => {}
}

export default AmpedDatePicker;
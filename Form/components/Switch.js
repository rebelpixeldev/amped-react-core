import React from 'react';

import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

export const Switch = ( { label, name, onFieldChange } ) => (
	<Toggle
		label={label}
		labelStyle={{width:'auto'}}
		onToggle={(evt, newVal) => onFieldChange(name, newVal)}
	/>
);

Switch.propTypes = {
	label           : PropTypes.string,
	name            : PropTypes.string.isRequired,
	onFieldChange   : PropTypes.func
}

Switch.defaultProps = {
	onFieldChange : () => {}
}

export default Switch;
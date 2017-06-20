import React from 'react';

import Toggle from 'material-ui/Toggle';

export const Switch = ( { label, name, onFieldChange } ) => (
	<Toggle
		label={label}
		labelStyle={{width:'auto'}}
		onToggle={(evt, newVal) => onFieldChange(name, newVal)}
	/>
);

Switch.propTypes = {
	label : React.PropTypes.string,
	name : React.PropTypes.string.isRequired,
	onFieldChange : React.PropTypes.func
}

Switch.defaultProps = {
	onFieldChange : () => {}
}

export default Switch;
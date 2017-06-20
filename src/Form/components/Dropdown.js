import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const Dropdown = ( {name, label, value, formValues, options, minDate, maxDate, onFieldChange} ) => {

	const style = {width:'100%', paddingLeft:0, paddingRight:0, marginLeft:0};

	return (
		<div style={style}>
			<label htmlFor={name} className="amped-form__label">{label}</label>
			<DropDownMenu value={formValues[name]}
			              menuStyle={style}
			              style={style}
			              labelStyle={style}
			              listStyle={style}
			              underlineStyle={style}
			              onChange={(evt, index, value) => onFieldChange(name, value)}>
				{options.map(( option, i ) => <MenuItem key={i} value={option.value} primaryText={option.label} />)}
			</DropDownMenu>
		</div>
	);
}

Dropdown.propTypes = {
	label : React.PropTypes.string,
	name : React.PropTypes.string.isRequired,
	onFieldChange : React.PropTypes.func
}

Dropdown.defaultProps = {
	onFieldChange : () => {}
}

export default Dropdown;
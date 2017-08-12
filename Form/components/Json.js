import React from 'react';

import PropTypes from 'prop-types';

import { Input } from 'amped-react-core/Form';

export const Json = ( { name, value, formValues, onFieldChange } ) => {
	const keys = Object.keys(value);

	const handleFieldChange = ( fieldName, value ) => {
		onFieldChange(name, Object.assign({}, formValues[name], {[fieldName] : value}));
	}

	return (
			<div className="json-fields-container">
				{ keys.map(( key, i ) => {
					return (
						<Input
							key={i}
							label={key.replace('_', ' ')}
							name={key}
							formValues={typeof formValues === 'undefined'? {} : formValues[name]}
							onFieldChange={handleFieldChange}
						/>
					)
				})}
			</div>
	);
};

Json.propTypes = {
	name            : PropTypes.string,
	value           : PropTypes.object,
	formValues      : PropTypes.object,
	onFieldChange   : PropTypes.func
};

Json.defaultProps = {
	onFieldChange : () => {}
}

export default Json;
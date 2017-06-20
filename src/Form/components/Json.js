import React from 'react';

import { Input } from 'amped/Form';

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
	name : React.PropTypes.string,
	value : React.PropTypes.object,
	formValues : React.PropTypes.object,
	onFieldChange : React.PropTypes.func
};

Json.defaultProps = {
	onFieldChange : () => {}
}

export default Json;
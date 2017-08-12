import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'amped-react-core/Form';

export const Form = ( {action, children, content, style, className, submitLabel, onSubmit} ) => (
	<form action={action} style={style} className={`amped-form ${className}`} onSubmit={onSubmit}>

		{ typeof content.props !== 'undefined' && content.props.children.length > 0 &&
			(
				<div className="amped-form-container">
					<div className="amped-form--content">
						{content}
					</div>
					<div className="amped-form--actions">
						{children || (
							<Button className="amped-form--submit" label={submitLabel} onClick={onSubmit} />
						)}
					</div>
				</div>
			)
		}
	</form>
);

Form.propTypes = {
	style       : PropTypes.object,
	className   : PropTypes.string,
	submitLabel : PropTypes.string
};

Form.defaultProps = {
	style       : {},
	className   : '',
	submitLabel : 'Submit'
}

export default Form;
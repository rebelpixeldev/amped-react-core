import React from 'react';

import PropTypes from 'prop-types';

export const Text = ( {children, value} ) => (
    <span>{(typeof children === 'undefined' || children === null ? value : children).toString()}</span>
);

Text.propTypes = {
	children    : PropTypes.any,
	value       : PropTypes.string
};

Text.defaultProps = {
	value : ''
}

export default Text;
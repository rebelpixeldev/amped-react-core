import React from 'react';

export const Text = ( {children, value} ) => (
    <span>{(typeof children === 'undefined' || children === null ? value : children).toString()}</span>
);

Text.propTypes = {
	children : React.PropTypes.any,
	value : React.PropTypes.string
};

Text.defaultProps = {
	value : ''
}

export default Text;
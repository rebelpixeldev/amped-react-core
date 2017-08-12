import React from 'react';
import PropTypes from 'prop-types';

export const Image = ( { src } ) => (
	<img src={src} alt="" style={{width:40}} />
);

Image.propTypes = {
	src : PropTypes.string
};

export default Image;
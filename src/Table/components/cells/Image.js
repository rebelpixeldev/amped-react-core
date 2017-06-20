import React from 'react';

export const Image = ( { src } ) => (
	<img src={src} alt="" style={{width:40}} />
);

Image.propTypes = {
	src : React.PropTypes.string
};

export default Image;
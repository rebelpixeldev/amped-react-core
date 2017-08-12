import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import '../styles/loader.scss';


export const AmpedLoader = ( { loading, label, size, thickness } ) => (
	<div className={`amp-loader ${loading ? 'amp-loader__loading' : ''}`}>
		<CircularProgress className="amp-loader__indicator" size={size} thickness={thickness}/>
		{ label !== '' && ( <div className="amp-loader__label">{label}</div> ) }
	</div>
)

AmpedLoader.propTypes = {
	size        : PropTypes.number,
	thickness   : PropTypes.number,
	loading     : PropTypes.oneOfType([
					PropTypes.bool,
					PropTypes.func
				]),
	label       : PropTypes.string
}

AmpedLoader.defaultProps = {
	size        : 40,
	thickness   : 3,
	loading     : false,
	label       : ''
}

export default AmpedLoader;
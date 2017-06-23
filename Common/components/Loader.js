import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import '../styles/loader.scss';


export const AmpedLoader = ( { loading } ) => (
	<div className={`amped-loader ${loading ? 'amped-loader--loading' : ''}`}>
		<CircularProgress className="amped-loader--indicator" size={40} thickness={3}/>
	</div>
)

export default AmpedLoader;
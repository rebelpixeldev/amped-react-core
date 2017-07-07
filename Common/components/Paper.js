import React from 'react';
import Paper from 'material-ui/Paper';

import '../styles/_paper.scss';

export const AmpedPaper = ( { title, children } ) => (
    <Paper className="amp-paper">
	    {title && (<div className="amp-paper__title">{title}</div>) }
	    {children}
    </Paper>
);

export default AmpedPaper;
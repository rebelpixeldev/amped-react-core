import React from 'react';

import '../styles/_content.scss';

export const Content = ( { children } ) => (
	<div className="amped-content">
		{children}
	</div>
);

export default Content;
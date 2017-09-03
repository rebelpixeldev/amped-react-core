import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const style = {
	color:'#fff'
}

export const TableActionBar = ( { items } ) => {
	return (
		<div className={`amped-table-action-bar ${items.length > 0 ? 'amped-table-action-bar--active' : ''} `}>
			<div className="amped-push-it"></div>

			<div className="amped-message-container">
				<div className="amped-table-action-bar--message">
					<NavigationClose style={style} />
					<div className="amped-num-selected" style={style}>
						{items.length} selected
					</div>
				</div>
				<div className="amped-table-action-bar--cta-group">
					<FlatButton label="Cancel" style={style} />
					<FlatButton label="Delete" style={style} />
				</div>
			</div>
		</div>
	);
}

export default TableActionBar;
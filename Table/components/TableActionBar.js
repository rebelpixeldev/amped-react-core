import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import '../styles/TableActionBar.scss';

const style = {
	color:'#fff'
}

export const TableActionBar = ( { items } ) => {
	// console.log('ITTEMS');
	// console.log(items);
	// if ( typeof items === 'undefined' )
	// 	items = [];
	return (
		<div className={`amp-table-action-bar ${items.length > 0 ? 'amp-table-action-bar--active' : ''} `}>
			<div className="amp-push-it"></div>

			<div className="amp-message-container">
				<div className="amp-table-action-bar--message">
					<NavigationClose style={style} />
					<div className="amp-num-selected" style={style}>
						{items.length} selected
					</div>
				</div>
				<div className="amp-table-action-bar--cta-group">
					<FlatButton label="Cancel" style={style} />
					<FlatButton label="Delete" style={style} />
				</div>
			</div>
		</div>
	);
}

export default TableActionBar;
import React from 'react';
import { AmpedTable } from 'amped-react-core/Table';
import { AmpedCard } from 'amped-react-core/Common';

import { SHOW_SNACK_BAR, HIDE_SNACK_BAR } from 'amped-react-core/Alerts/actions';

export class Table extends React.Component{
	render(){
		return (
			<AmpedTable {...this.props} menuItems={this.props.rowMenuItems}  />
		);
	}
}

export default Table;
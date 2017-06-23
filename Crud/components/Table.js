import React from 'react';
import { AmpedTable } from 'amped-react-core/Table';
import { AmpedCard } from 'amped-react-core/Common';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import { SHOW_SNACK_BAR, HIDE_SNACK_BAR } from 'amped-react-core/Alerts/actions';



export class Table extends React.Component{
	render(){
		return (
			<AmpedCard title="Hey">
				<AmpedTable {...props} menuItems={this.props.rowMenuItems}  />
			</AmpedCard>
		);
	}
}

export default Table;
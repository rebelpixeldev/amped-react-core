import React  from 'react';
import { connect } from 'react-redux'

import { AmpedTable } from 'amped-react-core/Table';
import { AmpedCard } from 'amped-react-core/Common';
import { AmpedService }  from 'amped-react-core/Core/AmpedService';
import { AmpedTransitionPage, ampedSocketConnector } from 'amped/Core';
import { SHOW_CONFIRM, HIDE_CONFIRM } from 'amped-react-core/Alerts/actions';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings
});


class Table extends React.Component{
	

	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			model : typeof this.props.model === 'undefined' ? this.props.params.model : this.props.model,
			loading : true,
			rowMenuItems : [
				{ label : 'Edit',  onClick : this.handleMenuItemEditClick.bind(this) },
				{ label : 'Delete',  onClick : this.handleMenuItemDeleteClick.bind(this) }
			]
		}
	}

	getData(){
		const url = this.props.filterAccount ? `/api/${this.state.model}/account` : `/api/${this.state.model}`;
		return Promise.all([
			AmpedService.get(url),
			AmpedService.get(`/api/${this.state.model}/tableHeaders`)
		])
	}

	getCellComponent(){

	}

	handleMenuItemEditClick(row){
		this.props.router.push(`/crud/edit/${this.state.model}/${row.id}`);
	}

	handleMenuItemDeleteClick(row){
		this.props.dispatch({
			type: SHOW_CONFIRM,
			message: 'Are you sure you want to delete this item',
			title: 'Delete',
			acceptLabel: 'Delete',
			onAccept : (  ) => {
				AmpedService.delete(`/api/${this.state.model}/${row.id}`);
					// .then((  ) => {
					//     console.log('DELETED');
					// })
			}
		});
	}

	handleSocket(evt, data){
		console.log('HANDING SOCKET', evt, data);
		switch(evt){
			case 'USERS_DELETE':
				this.refs.tableComponent.wrappedInstance.handleDeleteItem(data.id);
				break;
		}
	}
	
	render(){

		return (
			<AmpedCard title='Crud Title'>
				<AmpedTable ref="tableComponent" {...this.props} {...this.state} menuItems={this.state.rowMenuItems} getData={this.getData.bind(this)}  />
			</AmpedCard>
		)
	}
	
}


export default connect(mapStateToProps, null, null, {withRef:true})(ampedSocketConnector(Table, '*'))

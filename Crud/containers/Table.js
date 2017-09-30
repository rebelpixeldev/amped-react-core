import React  from 'react';
import { propTypes } from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { AmpedTable } from 'amped-react-core/Table';
import { AmpedCard } from 'amped-react-core/Common';
import { AmpedService }  from 'amped-react-core/Core/AmpedService';
import { AmpedTransitionPage, ampedSocketConnector, AmpedUtil } from 'amped-react-core/Core';
import { SHOW_CONFIRM, HIDE_CONFIRM } from 'amped-react-core/Alerts/actions';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings
});

class Table extends React.Component{

	constructor(props){
		super(props);
		this.props = props;
		console.log('TABLE PROPS', this.props);
		this.state = {
			model : this.getModelName(this.props),
			loading : true,
			rowMenuItems : [
				{ label : 'Edit',  onClick : this.handleMenuItemEditClick.bind(this) },
				{ label : 'Delete',  onClick : this.handleMenuItemDeleteClick.bind(this) }
			]
		}
	}

	componentWillReceiveProps(newProps){
		console.log('CRUD TABLE GOT EM', newProps);
		this.props = newProps;
		this.setState((  ) => ( { model: this.getModelName(newProps) } ));
		// this.getData();
	}

	getData(){
		const url = this.props.filterAccount ? `/api/${this.state.model}/account` : `/api/${this.state.model}`;
		return Promise.all([
			AmpedService.get(url),
			AmpedService.get(`/api/${this.state.model}/tableHeaders`)
		])
	}

	getModelName(props){
		return typeof props.model === 'undefined' ? props.match.params.model : props.model;
	}


	getCellComponent(){

	}

	handleMenuItemEditClick(row){
		this.props.history.push(`/crud/edit/${this.state.model}/${row.id}`);
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
		switch(evt){
			case 'USERS_DELETE':
				this.refs.tableComponent.wrappedInstance.handleDeleteItem(data.id);
				break;
		}
	}

	render(){
			const title = typeof this.state.model !== 'undefined' ? AmpedUtil.capitalize(this.state.model) : '';
		return (
			<AmpedCard title={title}>
				<AmpedTable ref="tableComponent" {...this.props} {...this.state} menuItems={this.state.rowMenuItems} getData={this.getData.bind(this)}  />
			</AmpedCard>
		)
	}

}


export default withRouter(connect(mapStateToProps, null, null, {withRef:true})(ampedSocketConnector(Table, '*')))


// export const Table = ( props ) => {
//     return ( <div>WTF</div> );
// }
//
// export default Table;
import {connect} from 'react-redux'
import FormComponent from '../components/Form'
import { CrudService } from 'amped/Crud';

import { AmpedService }  from 'amped/Core/AmpedService';

import '../../Core/styles/_cards.scss';

import { SET_VALUES, REMOVE_VALUES, UPDATE_FIELD } from 'amped/Form/actions';

const mapStateToProps = (state) => ({
	user: true,
	settings: state.amped.settings
});

import React from 'react';

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			loading : false,
			model: typeof this.props.model === 'undefined' ? this.props.params.model : this.props.model,
			id: typeof this.props.id === 'undefined' ? this.props.params.id : this.props.id,
			formData : {
				method : 'POST',
				action : '',
				fields : []
			}
		}

		this.service = new CrudService(this.state.model, this.state.id);



	}

	componentDidMount() {
		this.setState({loading:true});
		// AmpedService.get(`/api/${this.state.model}/edit/${this.state.id}`)
		this.service.readForForm()
			.then((data) => {
			console.log('RESPONSE', data.response);
				this.setState({
					loading:false,
					formData : {
						method : 'POST',
						action : `/api/${this.state.model}/${this.state.id}`,
						fields: data.response
					}
				});

				this.props.dispatch({
					type : SET_VALUES,
					fields : data.response,
					name : this.state.model
				})
			});
	}

	componentWillReceiveProps(nextProps){
		console.log('CRYD FROM NEXT', nextProps);
	}

	handleFormSave(data){
		console.log('DATA', data);
		this.service.update(data)
			.then(( resp ) => {
			    console.log('SAVVVED');
			})
	}

	render() {
		return (
			<div>
				{ this.state.formData && (
					<FormComponent {...this.state} onSave={this.handleFormSave.bind(this)} />
				)}

			</div>
		)
	}

}
export default connect(mapStateToProps, null, null, {withRef:true})(Form)

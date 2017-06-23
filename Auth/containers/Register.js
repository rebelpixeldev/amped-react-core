import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {default as RegisterComponent } from '../components/Register';

import '../styles/_login.scss';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings,
	loginFormData : {
		action: '/api/user/register',
		method : 'POST',
		fields: [
			[
				{
					type: 'text',
					label: 'First Name',
					name: 'first_name',
				},
				{
					type: 'text',
					label: 'Last Name',
					name: 'last_name',
				}
			],
			[
				{
					type: 'text',
					label: 'Email',
					name: 'email',
				}
			],
			[
				{
					type: 'password',
					label: 'Password',
					name: 'password',
					icon: 'lock'
				}
			]
		]
	}
});

export class Register extends React.Component{

	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			requesting : false
		}
	}

	handleFormSubmit(resp){
		console.log('HANDLING FORM');
		console.log(resp);
		this.setState({requesting:false});
		if ( resp.success )
			browserHistory.push(`/login/${resp.response}`);
	}

	handleFormRequestStart(vals){
		this.setState({requesting:true});
		return true;
	}

	render(){
		return (
			<RegisterComponent {...this.props}
			                   {...this.state}
								onFormSubmit={this.handleFormSubmit.bind(this)}
			                   onRequestStart={this.handleFormRequestStart.bind(this)}
			                   onSubmit={this.handleFormSubmit.bind(this)} />
		)
	}

}

export default connect(mapStateToProps)(Register)

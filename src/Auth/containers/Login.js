import { connect } from 'react-redux';
import { default as LoginComponent } from '../components/Login';

import '../styles/_login.scss';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings,
	loginFormData : {
		action: '/api/user/login',
		method : 'POST',
		fields: [
			[
				{
					type: 'text',
					label: 'Email',
					name: 'email',
					icon: 'account_circle'
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

import React from 'react';

export class Login extends React.Component{


	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			requesting : false
		}
	}


	handleFormRequestStart(vals){
		this.setState({requesting:true});
		return true;
	}


	handleFormSubmit(resp){
		this.setState({requesting:false});
		if ( resp.success ){
			localStorage.setItem('amped-token', resp.response);
			window.location = '/';
		}

	}

	render(){
		return (
			<LoginComponent {...this.props}
			                {...this.state}
			                onRequestStart={this.handleFormRequestStart.bind(this)}
			                onSubmit={this.handleFormSubmit.bind(this)} />
		)
	}

}

export default connect(mapStateToProps)(Login)

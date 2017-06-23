import React from 'react';
import { connect } from 'react-redux';
import { default as SetPasswordComponent } from '../components/SetPassword';
import { browserHistory } from 'react-router';

import '../styles/_login.scss';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings
});

export class SetPassword extends React.Component{

	constructor(props){
		super(props);

		this.props = props;
		console.log(this.props);

		this.state = {
			loginFormData : {
				action: '/api/user/setpassword',
				method : 'POST',
				fields: [
					[
						{
							type: 'hidden',
							name: 'token',
							value : this.props.router.params.token
						}
					],
					[
						{
							type: 'password',
							label: 'New Password',
							name: 'new_password',
							icon: 'account_circle'
						}
					],
					[
						{
							type: 'password',
							label: 'Retype Password',
							name: 'new_password_again',
							icon: 'account_circle'
						}
					]
				]
			}
		}
	}

	handleFormSubmit(resp){
		if ( resp.success )
			browserHistory.push('/login');
	}

	render(){
		return (
			<SetPasswordComponent {...this.props}
			                      {...this.state}
			                      onSubmit={this.handleFormSubmit.bind(this)}  />
		)
	}

}

export default connect(mapStateToProps)(SetPassword)

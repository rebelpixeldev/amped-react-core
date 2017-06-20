import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import {Form, Button, LoaderButton} from 'amped/Form';

export class ResetPassword extends React.Component{

	render(){
		const {loginFormData, settings, requesting, onSubmit, onRequestStart} = this.props;

		return (
			<Card className="amped-card amped-login-card" style={{width: 400}}>
				<div className="amped-login-card--header paper--depth-2">
					<h1>Reset password</h1>
				</div>
				<Form data={loginFormData}
				      onSubmit={onSubmit}
				      onRequestStart={onRequestStart}
				      ref={(child) => this.loginForm = child}
				      name="resetpassword"
				      style={ {marginBottom: 16} }>
					<div className="amped-auth-card--actions">
						<span className="amped-auth-card--actions--link" onClick={() => this.props.router.push('/register')}>Register</span>
						<span className="amped-auth-card--actions--link" onClick={() => this.props.router.push('/login')}>Login</span>
					<LoaderButton onClick={() => this.loginForm.wrappedInstance.submit.call(this.loginForm.wrappedInstance)} label="Reset" loading={requesting} />
					</div>
				</Form>
			</Card>
		)
	}
}


export default ResetPassword;
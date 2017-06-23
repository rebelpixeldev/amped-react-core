import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import {Form, Button, LoaderButton} from 'amped-react-core/Form';

export class Login extends React.Component{

	render(){
		const {loginFormData, settings, requesting, onSubmit, onRequestStart} = this.props;

		return (
			<Card className="amped-card amped-login-card" style={{width: 450}}>
				<div className="amped-login-card--header paper--depth-2">
					<h1>{settings.site.name} Login</h1>
				</div>
				<Form data={loginFormData}
				      ref={(child) => this.loginForm = child}
				      name="login"
				      onRequestStart={onRequestStart}
				      onSubmit={onSubmit}
				      style={ {marginBottom: 16} }>
					<div className="amped-auth-card--actions">
						<span className="amped-auth-card--actions--link" onClick={() => this.props.router.push('/register')}>Register</span>
						<span className="amped-auth-card--actions--link" onClick={() => this.props.router.push('/resetpassword')}>Forgot Password</span>
						<LoaderButton onClick={() => this.loginForm.wrappedInstance.submit.call(this.loginForm.wrappedInstance)} label="Login" loading={requesting} />
					</div>
				</Form>
				<Divider />
				<div className="amped-login-card--external">
					<button className="amped-login-button amped-login-button--google" onClick={() => {
						window.open(`${settings.urls.api.domain}/auth/google`)
					}}>
						Login with Google
					</button>
					<button className="amped-login-button amped-login-button--facebook" onClick={() => {
						window.open(`${settings.urls.api.domain}/auth/facebook`)
					}}>
						Login with Facebook
					</button>
				</div>
			</Card>
		)
	}

}

// export default Login;
//
// export const Login = () => (
//
// );

export default Login;
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';

import {Form, Button, LoaderButton} from 'amped/Form';

export class Register extends React.Component{

	render(){
		const {loginFormData, settings, requesting, onSubmit, onRequestStart, onFormSubmit, onOauthClick} = this.props;

		return (
			<Card className="amped-card amped-login-card" style={{width: 400}}>
				<div className="amped-login-card--header paper--depth-2">
					<h1>Create an account</h1>
				</div>
				<Form data={loginFormData}
				      ref={(child) => this.register = child}
				      name="register"
				      submitLabel="Create"
				      onRequestStart={onRequestStart}
				      onSubmit={onSubmit}
				      style={ {marginBottom: 16} }>
					<div className="amped-auth-card--actions">
						<span className="amped-auth-card--actions--link" onClick={() => this.props.router.push('/login')}>Login</span>
						<LoaderButton onClick={() => this.register.wrappedInstance.submit.call(this.register.wrappedInstance)} loading={requesting}>
							Create
						</LoaderButton>
					</div>
				</Form>
			</Card>
		)
	}

}

// export default Login;
//
// export const Login = () => (
//
// );

export default Register;
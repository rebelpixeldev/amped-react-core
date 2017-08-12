import React from 'react';
import {Card} from 'material-ui/Card';

import {Form, Button, LoaderButton} from 'amped-react-core/Form';

export class SetPassword extends React.Component{

	render(){
		const {loginFormData, settings, onSubmit} = this.props;

		return (
			<Card className="amped-card amped-login-card" style={{width: 400}}>
				<div className="amped-login-card--header paper--depth-2">
					<h1>Set password</h1>
				</div>
				<Form data={loginFormData}
				      onSubmit={onSubmit}
				      ref={(child) => this.loginForm = child}
				      name="resetpassword"
				      style={ {marginBottom: 16} }>
					<div className="amped-auth-card--actions">
						<Button onClick={() => this.loginForm.wrappedInstance.submit.call(this.loginForm.wrappedInstance)} label="Reset" />
					</div>
				</Form>
			</Card>
		)
	}
}


export default SetPassword;
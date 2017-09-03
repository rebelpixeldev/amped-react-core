import React, { Component } from 'react';

import { AmpedAvatar } from 'amped-react-core/User';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


export const Topbar = ( props ) => {
	return (
			<AppBar
				zDepth={2}
				className="amped-topbar"
				title={props.settings.site.name}
				onTitleTouchTap={() => props.router.push(`/`)}
				iconElementRight={props.user && Object.keys(props.user).length > 0 ? <LoggedIn {...props} /> : <Login {...props} />}
			/>
	);
}

export class Login extends Component {
	static muiName = 'FlatButton';

	render() {
		return (
			<FlatButton {...this.props} label="Login" onTouchTap={(  ) => this.props.router.push(`/login`)} />
		);
	}
}

export const LoggedIn = (props) => {
	return (
		<div className="amped-topbar__actions">
			<span className="amped-topbar__avatar" onClick={() => props.router.push(`/user/profile`)}>
				<AmpedAvatar {...props} />
			</span>
			<IconMenu
				className="amped-topbar__user-menu"
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				<MenuItem primaryText="Profile" onClick={() => props.router.push(`/user/profile`)} />
				<MenuItem primaryText="Sign out" onClick={props.onSignoutClick} />
			</IconMenu>
		</div>
	);
}

export default Topbar;
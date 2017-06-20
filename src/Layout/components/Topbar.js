import React, { Component } from 'react';

import { AmpedAvatar } from 'amped/User';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


export const Topbar = ( props ) => (
	<AppBar
		zDepth={2}
		title={props.settings.site.name}
		onTitleTouchTap={() => props.router.push(`/`)}
		iconElementRight={props.user ? <LoggedIn {...props} /> : <Login {...props} />}
	/>
);

class Login extends Component {
	static muiName = 'FlatButton';

	render() {
		return (
			<FlatButton {...this.props} label="Login" />
		);
	}
}

const LoggedIn = (props) => {
	return (
		<div className="amp-topbar">
			<span className="amp-topbar__avatar" onClick={() => props.router.push(`/user/profile`)}>
				<AmpedAvatar {...props} />
			</span>
			<IconMenu
				className="amp-topbar__user-menu"
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
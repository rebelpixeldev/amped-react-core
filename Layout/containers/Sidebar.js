import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router';
import SidebarComponent from '../components/Sidebar'

import SocialPeople from 'material-ui/svg-icons/social/people';
import PermMedia from 'material-ui/svg-icons/action/perm-media';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Timeline from 'material-ui/svg-icons/action/timeline';

import '../styles/_sidebar.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
	navigation : [
		{ label : 'Dashboard', icon : Dashboard, url : '/' },
		{ label : 'Users', icon : SocialPeople, url : '/crud/view/users' },
		{ label : 'Media Library', icon : PermMedia, url : '/file/library' },
		{ label : 'Admin', type:'title' },
		{ label : 'Activity', icon : Timeline, url : '/crud/view/activity' },
	],

})

class Sidebar extends React.Component{

	constructor(props){
		super(props);
		this.props = props;

		console.log(this.props);
	}

	render(){
		return (
			<SidebarComponent {...this.props} />
		)
	}

}

export default withRouter(connect(mapStateToProps)(Sidebar))

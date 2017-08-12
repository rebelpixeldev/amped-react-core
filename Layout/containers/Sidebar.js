import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router';
import SidebarComponent from '../components/Sidebar'

import SocialPeople from 'material-ui/svg-icons/social/people';
import PermMedia from 'material-ui/svg-icons/action/perm-media';

import '../style/_sidebar.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
	navigation : [
		{ label : 'Users', icon : SocialPeople, url : '/crud/view/users' },
		{ label : 'Media Library', icon : PermMedia, url : '/file/library' }
	],

})

class Sidebar extends React.Component{

	constructor(props){
		super(props);
		this.props = props;
	}

	render(){
		return (
			<SidebarComponent {...this.props} />
		)
	}

}

export default withRouter(connect(mapStateToProps)(Sidebar))

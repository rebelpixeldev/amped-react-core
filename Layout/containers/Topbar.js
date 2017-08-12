import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { default as TopbarComponent } from '../components/Topbar'

import { AmpedStorage } from 'amped-react-core/Core';

import '../style/_topbar.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings
})

export class Topbar extends React.Component{

	handleLogoutClick(){
		AmpedStorage.removeUserToken();
		window.location.href = '/';
	}

	render(){
		return (
			<TopbarComponent {...this.props} onSignoutClick={this.handleLogoutClick.bind(this)} />
		)
	}

}

export default connect(mapStateToProps)(withRouter(Topbar))

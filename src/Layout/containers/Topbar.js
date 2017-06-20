import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { default as TopbarComponent } from '../components/Topbar'

import { AmpedStorage } from 'amped/Core';

import '../style/_topbar.scss';

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
	user : true,
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

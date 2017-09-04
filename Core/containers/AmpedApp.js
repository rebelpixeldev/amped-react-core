import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { default as AmpedAppComponent } from '../components/AmpedApp'
import { AmpedService } from '../AmpedService';
import {Topbar as AmpedTopbar, Sidebar as AmpedSidebar} from 'amped-react-core/Layout'

import { SET_USER } from '../actions';

console.log(AmpedService);


import '../styles/_core.scss';


export function AmpedApp(TopbarComponent = AmpedTopbar, SidebarComponent = AmpedSidebar){
	class AmpedAppContainer extends React.Component{

		static propTypes = {
			safeRoutes : PropTypes.array
		};

		static defaultProps = {
			safeRoutes : []
		};

		constructor(props){
			super(props);
			this.state = {
				setup : false
			}
		}
		componentDidMount(){
			console.log(AmpedService.getUser());
			AmpedService.getUser()
				.then(( user ) => {
					if ( typeof user.id === 'undefined' ){
						if ( this.getSafeRoutes().indexOf(browserHistory.getCurrentLocation().pathname) === -1 &&
							this.getSafeRoutes().indexOf(browserHistory.getCurrentLocation().pathname.split('/')[1]) === -1 )
						// this.setState({setup: true});
							browserHistory.push('/login');
					} else {
						this.props.dispatch({ type: SET_USER, user: user })
					}
					this.setState({setup: true});
				})
		}

		render(){
			return (
				<AmpedAppComponent {...this.props}
				                   {...this.state}
				                   TopbarComponent={TopbarComponent}
				                   SidebarComponent={SidebarComponent}/>
			)
		}

		get defaultSafeRoutes(){
			return ['/login', '/signup', '/register', '/resetpassword', 'setpassword'];
		}

		getSafeRoutes(){
			return [...this.props.safeRoutes, ...this.defaultSafeRoutes];
		}
	}

	const mapStateToProps = (state) => ({
		user : state.amped.user,
		settings : state.amped.settings,

	});


	return connect(mapStateToProps, null, null, {
		withRef : true
	})(AmpedAppContainer);
}

export default AmpedApp;

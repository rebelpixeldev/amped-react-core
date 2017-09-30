import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { default as AmpedLayoutComponent } from '../components/AmpedLayout'
import { AmpedService } from '../AmpedService';
import {Topbar as AmpedTopbar, Sidebar as AmpedSidebar} from 'amped-react-core/Layout'

import { SET_USER } from '../actions';

import '../styles/_core.scss';


export function AmpedLayout(TopbarComponent = AmpedTopbar, SidebarComponent = AmpedSidebar) {
	class AmpedLayoutContainer extends React.Component{

		static propTypes = {
			safeRoutes : PropTypes.array
		};

		static defaultProps = {
			safeRoutes : []
		};

		constructor(props){
			super(props);
			console.log('LAYOUT PROPS', props);
			this.state = {
				setup : false
			}
		}
		componentDidMount(){
			AmpedService.getUser()
				.then(( user ) => {
					if ( typeof user.id === 'undefined' ){
						if ( this.getSafeRoutes().indexOf(this.props.location.pathname) === -1 &&
							this.getSafeRoutes().indexOf(this.props.location.pathname.split('/')[1]) === -1 )
							this.props.history.push('/login')
					} else {
						this.props.dispatch({ type: SET_USER, user: user })
					}
					this.setState({setup: true});
				})
		}

		render(){
			return (
				<AmpedLayoutComponent {...this.props}
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


	return withRouter(connect(mapStateToProps, null, null, {
		withRef : true
	})(AmpedLayoutContainer));
}

export default AmpedLayout;

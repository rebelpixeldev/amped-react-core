import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'

import { default as AmpedAppComponent } from '../components/AmpedApp'
import { SET_USER } from '../actions';
import { AmpedService } from 'amped-react-core/Core';

import PropTypes from 'prop-types';



import '../styles/_core.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,

});


export class AmpedApp extends React.Component{

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
			<AmpedAppComponent {...this.props} {...this.state}/>
		)
	}

	get defaultSafeRoutes(){
		return ['/login', '/signup', '/register', '/resetpassword', 'setpassword'];
	}

	getSafeRoutes(){
		return [...this.props.safeRoutes, ...this.defaultSafeRoutes];
	}
}


export default connect(mapStateToProps, null, null, {
	withRef : true
})(AmpedApp);

import React from 'react';

import { connect } from 'react-redux'
import { default as AvatarComponent } from '../components/Avatar'

import { ampedSocketConnector } from 'amped-react-core/Core';

import '../style/_avatar.scss';

const mapStateToProps = (state) => ({
	currentUser : state.amped.user,
	settings : state.amped.settings
});

export class Avatar extends React.Component{
	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			user : typeof this.props.user === 'undefined' ? this.props.currentUser : this.props.user
		}
	}

	componentWillReceiveProps(nextProps){
		if ( typeof nextProps.user !== 'undefined' )
		this.setState((  ) => {
		    return {user : nextProps.user }
		})
	}

	handleSocketUpdate(socket){
		if ( this.state.user.id === socket.user.id )
			this.setState({
				user : socket.user
			})
	}

	render(){
		return (
			<AvatarComponent {...this.props} {...this.state} />
		)
	}

}

export default connect(mapStateToProps)(ampedSocketConnector(Avatar, 'users'));

import React from 'react';

import { connect } from 'react-redux'
import { default as AvatarComponent } from '../components/Avatar'

import { ampedSocketConnector } from 'amped-react-core/Core';

import '../style/_avatar.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings
});

export class Avatar extends React.Component{
	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			user : this.props.user
		}
	}

	handleSocketUpdate(socket){
		if ( this.state.user.id === socket.user.id )
			this.setState({
				user : socket.user
			})
	}

	render(){
		return (
			<AvatarComponent {...this.state} />
		)
	}

}

export default connect(mapStateToProps)(ampedSocketConnector(Avatar, 'users'));

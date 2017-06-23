import React from 'react';
import { connect } from 'react-redux'

export class TransitionPage extends React.Component{

	static propTypes = {
		name : React.PropTypes.string,
		style : React.PropTypes.object
	};

	static defaultProps = {
		style : {}
	}

	constructor(props){
		super(props);
		this.props = props;
		this.state = {};
	}

	render(){

		return (
			<div style={this.props.style}>
				{this.props.children}
			</div>
		);
	}

}

export default connect()(TransitionPage);
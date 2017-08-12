import React from 'react';
import {connect} from 'react-redux'

import {AmpedLoader} from 'amped-react-core/Common';

export class TransitionPage extends React.Component {

	defaultProps = {
		loading: false
	}

	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<div className="amp-transition-page">
				{ this.props.loading ? (
						<AmpedLoader loading={true}/>
					) : (
						<div>{this.props.children}</div>
					)}
			</div>
		)
	}

}

export default TransitionPage;


// export class TransitionPage extends React.Component{
//
// 	static propTypes = {
// 		name : React.PropTypes.string,
// 		style : React.PropTypes.object
// 	};
//
// 	static defaultProps = {
// 		style : {}
// 	}
//
// 	constructor(props){
// 		super(props);
// 		this.props = props;
// 	}
//
// 	render(){
//
// 		return (
// 			<div style={this.props.style}>
// 				{this.props.children}
// 			</div>
// 		);
// 	}
//
// }
//
// export default connect()(TransitionPage);
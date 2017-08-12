import React from 'react';

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
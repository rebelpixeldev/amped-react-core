import React from 'react';

import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Router } from 'react-router'
import { withRouter } from "react-router-dom";

import { AmpedLayout } from 'amped-react-core/Core';
import { CrudRoutes } from 'amped-react-core/Crud';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,

});

const test = (  ) => (<h1>HI</h1>)

export class AmpedApp extends React.Component{


	shouldComponentUpdate () {
		return false
	}

	render(){
		const AmpedLayoutComponent = AmpedLayout();

		return (
			<Provider store={this.props.store}>
				<Router history={this.props.history}>
					<AmpedLayoutComponent>
						{this.props.children}
						<CrudRoutes />
					</AmpedLayoutComponent>
				</Router>
			</Provider>
		)
	}

}

export default connect(mapStateToProps, null, null, {
	withRef : true
})(AmpedApp);


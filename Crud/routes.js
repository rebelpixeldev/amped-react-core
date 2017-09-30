// import Table from './Table';
// import Form from './Form';
//
// export default (store, injectReducer) => [
// 	Table(store, injectReducer),
// 	...Form(store, injectReducer),
// ]

import React from 'react';

import { Route, Switch } from 'react-router';
import { CrudForm, CrudTable } from 'amped-react-core/Crud';

export const CrudRoutes = (props) => (
	<Switch>
		<Route path='/crud/edit/:model' component={CrudForm} />
		<Route path='/crud/view/:model' render={CrudTable} />
	</Switch>
)


export default CrudRoutes;
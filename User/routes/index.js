// import UserProfilePage from './UserProfilePage';
//
// export default (store, injectReducer) => [
// 	UserProfilePage(store, injectReducer)
// ]

import { Route } from 'react-router';
import { UserProfilePage } from '../containers/UserProfilePage';

export default (
	<div>
		<Route path='/user/profile' component={UserProfilePage} />
	</div>
)
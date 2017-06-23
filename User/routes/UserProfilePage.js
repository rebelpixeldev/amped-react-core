export default (store, reducer) => ({
	path : '/user/profile',
	/*  Async getComponent is only invoked when route matches   */
	getComponent (nextState, cb) {
		/*  Webpack - use 'require.ensure' to create a split point
		 and embed an async module loader (jsonp) when bundling   */
		require.ensure([], (require) => {
			/*  Webpack - use require callback to define
			 dependencies for bundling   */
			const Component = require('../containers/UserProfilePage').default;
			const reducer = require('../reducers/user').default;

			/*  Add the reducer to the store on key 'counter'  */
			reducer(store, { key: 'userprofilepage', reducer })

			/*  Return getComponent   */
			cb(null, Component)

			/* Webpack named bundle   */
		}, 'counter')
	}
})

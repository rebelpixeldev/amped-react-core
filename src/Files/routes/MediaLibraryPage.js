export default (store, reducer) => ({
	path : '/file/library',
	/*  Async getComponent is only invoked when route matches   */
	getComponent (nextState, cb) {
		/*  Webpack - use 'require.ensure' to create a split point
		 and embed an async module loader (jsonp) when bundling   */
		require.ensure([], (require) => {
			/*  Webpack - use require callback to define
			 dependencies for bundling   */
			const Component = require('../containers/MediaLibraryPage').default;
			const reducer = require('../reducers/files').default;

			/*  Add the reducer to the store on key 'counter'  */
			reducer(store, { key: 'medialibrarypage', reducer })

			/*  Return getComponent   */
			cb(null, Component)

			/* Webpack named bundle   */
		}, 'counter')
	}
})

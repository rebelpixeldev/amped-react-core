export default (store, reducer) => ({
	path : '/login',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const Component = require('../containers/Login').default;
			cb(null, Component)
		}, 'login')
	}
})

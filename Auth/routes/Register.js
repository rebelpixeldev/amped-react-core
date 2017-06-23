export default (store, reducer) => ({
	path : '/register',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const Component = require('../containers/Register').default;
			cb(null, Component)
		}, 'register')
	}
})

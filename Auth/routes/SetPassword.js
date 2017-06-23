export default (store, reducer) => ({
	path : '/setpassword/:token',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const Component = require('../containers/SetPassword').default;
			cb(null, Component)
		}, 'setpassword')
	}
})

export default (store, reducer) => ({
	path : '/resetpassword',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const Component = require('../containers/ResetPassword').default;
			cb(null, Component)
		}, 'resetpassword')
	}
})

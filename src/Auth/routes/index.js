export default (store, injectReducer) => [
	require('./Login').default(store, injectReducer),
	require('./LoginRedirect').default(store, injectReducer),
	require('./Register').default(store, injectReducer),
	require('./ResetPassword').default(store, injectReducer),
	require('./SetPassword').default(store, injectReducer),
]
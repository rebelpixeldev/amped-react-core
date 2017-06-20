export default (store, injectReducer) => [
	require('./UserProfilePage').default(store, injectReducer)
]
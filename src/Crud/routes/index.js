export default (store, injectReducer) => [
	require('./Table').default(store, injectReducer),
	...require('./Form').default(store, injectReducer),
]
export default (store, injectReducer) =>
	[
		...require('../Crud/routes').default(store, injectReducer),
		...require('../Files/routes').default(store, injectReducer),
		...require('../User/routes').default(store, injectReducer)

	]

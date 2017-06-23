import Table from './Table';
import Form from './Form';

export default (store, injectReducer) => [
	Table(store, injectReducer),
	...Form(store, injectReducer),
]
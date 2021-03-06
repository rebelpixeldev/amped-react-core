import {default as Auth} from '../Auth/routes';
import {default as Crud} from '../Crud/routes';
import {default as Files} from '../Files/routes';
import {default as User} from '../User/routes';


export default (store, injectReducer) =>
	[
		...Auth(store, injectReducer),
		...Crud(store, injectReducer),
		...Files(store, injectReducer),
		...User(store, injectReducer)

	]

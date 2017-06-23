import Login from './Login';
import LoginRedirect from './LoginRedirect';
import Register from './Register';
import ResetPassword from './ResetPassword';
import SetPassword from './SetPassword';

export default (store, injectReducer) => [
	Login(store, injectReducer),
	LoginRedirect(store, injectReducer),
	Register(store, injectReducer),
	ResetPassword(store, injectReducer),
	SetPassword(store, injectReducer),
]
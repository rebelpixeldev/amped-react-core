import { combineReducers } from 'redux';

import snackbar from './reducers/SnackBar';
import confirm from './reducers/Confirm';
import modal from './reducers/Modal';


export default combineReducers({
	snackbar,
	confirm,
	modal
})
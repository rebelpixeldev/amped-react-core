import { combineReducers } from 'redux';

import snackbar from './reducers/SnackBar';
import confirm from './reducers/Confirm';


export default combineReducers({
	snackbar,
	confirm
})
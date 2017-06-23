import { combineReducers } from 'redux';

import data from './reducers/data';
import values from './reducers/values';


export default combineReducers({
	data,
	values
})
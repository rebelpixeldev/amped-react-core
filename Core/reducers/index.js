
import { combineReducers } from 'redux';

import alerts from '../../Alerts/reducers';
import table from '../../Table/reducers';
import form from '../../Form/reducers';
import user from './user';
import settings from './settings';

export const ampedReducers = combineReducers({
	alerts,
	settings,
	table,
	form,
	user
});

export default ampedReducers;
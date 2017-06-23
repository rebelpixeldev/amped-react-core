import { SET_CONFIG } from '../actions';

const settings = window.__INITIAL_STATE__.amped.settings;

export default function crudTableReducer (state = settings, action) {
	switch(action.type){
		case SET_CONFIG:
			return action.config
	}
	return state;
}
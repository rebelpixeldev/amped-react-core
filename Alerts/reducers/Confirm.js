import { SHOW_CONFIRM, HIDE_CONFIRM } from '../actions';


export default function confirmReducer (state = false, action) {
	switch(action.type){
		case SHOW_CONFIRM:
			return action;
			break;
		case HIDE_CONFIRM:
			return false;
			break;
	}
	return state;
}

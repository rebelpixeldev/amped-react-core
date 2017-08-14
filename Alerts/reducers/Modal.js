import { SHOW_MODAL, HIDE_MODAL } from '../actions';


export default function modalReducer (state = null, action) {
	switch(action.type){
		case SHOW_MODAL:
			return action;
			break;
		case HIDE_MODAL:
			return null;
			break;
	}
	return state;
}

import { SHOW_SNACK_BAR, HIDE_SNACK_BAR } from '../actions';

const defaultData = {
	level : 'info'
}

export default function snackbarReducer (state = false, action) {
	switch(action.type){
		case SHOW_SNACK_BAR:
			return Object.assign({}, defaultData, action);
			break;
		case HIDE_SNACK_BAR:
			return false;
			break;
	}
	return state;
}

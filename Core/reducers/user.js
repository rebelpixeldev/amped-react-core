import { SET_USER } from '../actions';

export default function userReducer (state = {}, action) {

	switch(action.type){
		case SET_USER:
			return action.user;
	}

	return state;
}
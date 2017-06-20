
import { SET_VALUES, REMOVE_VALUES, UPDATE_FIELD } from '../actions';

export default function valuesReducer (state = {}, action) {

	switch(action.type){
		case SET_VALUES:
			return Object.assign({}, state, {[action.name] : action.fields.reduce((values, row) => {
				row.forEach((col) => {
					values[col.name] = typeof col.value === 'undefined' ? '' : col.value;
				});
				return values;
			}, {})});
		case UPDATE_FIELD:
			const form = Object.assign({}, state[action.formName]);
			form[action.fieldName] = action.value;
			return Object.assign({}, state, {[action.formName] : form});

	}

	return state;
}
import { ITEM_SELECTED, ON_CANCEL, ON_DELETE, ON_EDIT } from '../actions';

const def = {
	selectedItems : []
}


export default function actionbarReducer (state = def, action) {
	switch(action.type){
		case ITEM_SELECTED:
			const s = Object.assign({}, state);
			const isSelected = s.selectedItems.filter(item => item.id === action.item.id).length > 0;

			s.selectedItems = isSelected ?
				s.selectedItems.filter(item => item.id !== action.item.id) :
				[...s.selectedItems, action.item];

			return s;
	}

	return state;
}
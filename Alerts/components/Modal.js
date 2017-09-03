import React from 'react';

import Dialog from 'material-ui/Dialog';

import { HIDE_MODAL } from '../actions';

export const Modal = ( { data, dispatch } ) => {


	if ( data === null || data.opts === null )
		return null;

	const {
			content = (<div>You have not passed any content for the modal. Pass it with data.content.</div>),
			onClose = ()=>{
				dispatch({type : HIDE_MODAL });
			}
		} = data.opts;

	return (
		<Dialog
			modal={false}
			open={data !== null}
			onRequestClose={onClose}>
			<div>
				{content}
			</div>
		</Dialog>
	);
}

const ModalContent = ( Content ) => {

}

export default Modal;
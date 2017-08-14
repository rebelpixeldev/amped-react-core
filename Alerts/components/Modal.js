import React from 'react';

import Dialog from 'material-ui/Dialog';

export const Modal = ( { data } ) => {


	if ( data === null || data.opts === null )
		return null;

	const {
			content = (<div>You have not passed any content for the modal. Pass it with data.content.</div>),
			onClose = ()=>{}
		} = data.opts;

	return (
		<Dialog
			modal={true}
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
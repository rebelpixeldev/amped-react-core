import React from 'react';

import { AmpedMediaLibrary } from 'amped/Files';
import { LoaderButton } from 'amped/Form';
import { SHOW_CONFIRM, HIDE_CONFIRM } from 'amped/Alerts/actions';

export const MediaLibraryModalTrigger = ( {onFileSelect, dispatch} ) => {

	const handleFileSelect = ( file ) => {
		dispatch({ type : HIDE_CONFIRM })
		onFileSelect(file);
	}

	const handleClick = ( evt ) => {
		dispatch({type : SHOW_CONFIRM, message : (<AmpedMediaLibrary perpage={14} onFileSelect={handleFileSelect} />), title:false, style: {maxWidth:'90vw', height:'90vh'}});
	}

    return (
	    <LoaderButton label="Upload" loading={false} onClick={handleClick} />
    );
};

MediaLibraryModalTrigger.propTypes = {
	onFilesSelect : React.PropTypes.func
}

MediaLibraryModalTrigger.defaultProps = {
	onFileSelect : () => {}
}

export default MediaLibraryModalTrigger;
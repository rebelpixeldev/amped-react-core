import React from 'react';

import PropTypes from 'prop-types';

import { AmpedMediaLibrary } from 'amped-react-core/Files';
import { LoaderButton } from 'amped-react-core/Form';
import { SHOW_CONFIRM, HIDE_CONFIRM } from 'amped-react-core/Alerts/actions';

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
	onFilesSelect : PropTypes.func
}

MediaLibraryModalTrigger.defaultProps = {
	onFileSelect : () => {}
}

export default MediaLibraryModalTrigger;
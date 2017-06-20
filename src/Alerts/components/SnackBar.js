import React from 'react';

import Snackbar from 'material-ui/Snackbar';

export const SnackBar = ( { data } ) => {

	const styles = {
		info    : {},
		success : { background: '#5cb85c', color : '#333' },
		warning : { background: '#f0ad4e' },
		error   : { background: '#d9534f' }
	}

	return data ? (
		<Snackbar
			open={data !== false}
			bodyStyle={styles[data.level]}
			message={data.message}
			autoHideDuration={4000} />
	) : null ;
};

/**
 * Snackbar is user to display a toast message for an action that has been done
 *
 * message { string } - The message that should appear in the toast
 * level { string } - The level of the toast will change the color of the background.
 *      info    - Normal dark grey background
 *      success - Green background
 *      warning - Orange background
 *      error   - Red background
 * // @TODO implement
 * action { boolean|string|function } - What to do when the action link is clicked.
 *      if bool - This is used to set the action to false so it does not appear
 *      if string - This assumes the action is an endpoint and will automatically call AmpedService with the actionData
 *      if function - When the action is clicked, this function will be executed
 * actionLabel { string } - The label for the action button
 * actionData { any } - The data that should be sent along with the 'action' when the action buttons is clicked
 *
 */
SnackBar.propTypes = {
	message : React.PropTypes.string,
	level : React.PropTypes.oneOf(['info', 'success', 'warning', 'error']),
	// @TODO implement
	action : React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string,
		React.PropTypes.func
	]),
	actionLabel : React.PropTypes.string,
	actionData : React.PropTypes.any
};

SnackBar.defaultProps = {
	level : 'info',
	action : false
};

export default SnackBar;
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import '../styles/buttons.scss';

/**
 * Button
 * @param type
 * @param label
 * @param children
 * @param className
 * @param onClick
 * @constructor
 */
export const Button = ( props ) => {
	const { type, children, className, onClick } = props;

	return (
		<RaisedButton className={className}
		              onClick={onClick}
		              primary={true}
		              labelColor={fullWhite}
		              label=""
		              {...props}>
			{children}
		</RaisedButton>
	);
}

Button.propTypes = {
	className : React.PropTypes.string,
	label : React.PropTypes.string,
	onClick : React.PropTypes.func
};

Button.defaultProps = {
	className : '',
	onClick : () => {}
};

/**
 * Loader Button
 * @param props
 * @constructor
 */

export const LoaderButton = ( props ) => {
	const p = Object.assign({}, props);
	const { loading, progressSize, progressTickness } = p;

	const isLoading = typeof loading !== 'undefined' && loading;
	
	return (
		<Button className="amped-loader-button" label="" onClick={props.onClick}>
			<span className={`amped-loader-button--wrapper amped-button ${ isLoading ? 'loading' : ''}`}>
				{props.children || props.label}
				{ isLoading && (
					<span className="spinner">
						<CircularProgress color="rgba(255,255,255,0.7)"
						                  size={progressSize}
						                  thickness={progressTickness} />
					</span>
				)}
			</span>
		</Button>
	);
}

LoaderButton.propTypes = {
	loading             : React.PropTypes.bool,
	label               : React.PropTypes.string,
	progressSize        : React.PropTypes.number,
	progressTickness    : React.PropTypes.number,
	onClick             : React.PropTypes.func
};

LoaderButton.defaultProps = {
	onClick             : () => {},
	loading             : false,
	progressSize        : 25,
	progressTickness    : 3
};
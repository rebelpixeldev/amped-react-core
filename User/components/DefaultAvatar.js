import React from 'react';

import '../style/_default-avatar.scss';

export const DefaultAvatar = ( { user, className, size } ) => {

	const hashCode = (str) => { // java String#hashCode
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}

	const intToRGB = (i) => {
		const c = (i & 0x00FFFFFF)
			.toString(16)
			.toUpperCase();

		return "00000".substring(0, 6 - c.length) + c;
	}

	const style = {
		width:size,
		height:size,
		backgroundColor: `#${intToRGB(hashCode(user.email || user.display_name))}`
	}

    return (
		<span className={`default-avatar ${className}`} style={style}>{user.display_name[0].toUpperCase()}</span>
    );
};

DefaultAvatar.defaultProps = {
	className : '',
	size : 40
}

export default DefaultAvatar;
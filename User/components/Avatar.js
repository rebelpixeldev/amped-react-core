import React from 'react';

import { default as MaterialAvatar } from 'material-ui/Avatar';
import PropTypes from 'prop-types';

import { DefaultAvatar } from './DefaultAvatar';

export const Avatar = ( {user, showUsername, size} ) => {
	return (
		<span>
			{ typeof user.id !== 'undefined' && (
				<span className="amped-avatar">
					<div style={showUsername ? {'marginRight':12} : {}}>
						{user.upload !== null ? (
							<MaterialAvatar src={user.upload.thumb_url} size={size} />) :
							(<DefaultAvatar size={size} user={user} />)
						}
					</div>
					{showUsername && (<span>{user.display_name}</span>) }
				</span>
			)}
		</span>
	);
}

Avatar.propTypes = {
	showUsername    : PropTypes.oneOfType([
						PropTypes.bool,
						PropTypes.func
					]),
	size            : PropTypes.number
}

Avatar.defaultProps = {
	showUsername    : true,
	size            : 40
}

export default Avatar;
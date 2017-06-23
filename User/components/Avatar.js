import React from 'react';

import { default as MaterialAvatar } from 'material-ui/Avatar';

import { DefaultAvatar } from './DefaultAvatar';

export const Avatar = ( {user} ) => {
	return (
		<span>
			{ typeof user.id !== 'undefined' && (
				<span className="amped-avatar">
					<div style={{'marginRight':12}}>
						{user.upload !== null ? (
							<MaterialAvatar src={user.upload.thumb_url}></MaterialAvatar>) :
							(<DefaultAvatar user={user} />)
						}
					</div>
					{user.display_name}
				</span>
			)}
		</span>
	);
}

export default Avatar;
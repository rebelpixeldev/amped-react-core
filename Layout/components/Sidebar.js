import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';


const NavItem = ( props ) => (
	<ListItem className={`amped-sidebar__item ${props.active ? 'active' : ''}`}
	          primaryText={props.label}
	          leftIcon={<props.icon />}
	          onClick={() => props.router.push(props.url)} />
);

const TitleItem = ( { label } ) => (
	<Subheader className="amped-sidebar__title">{label}</Subheader>
)

export const Sidebar = ({ navigation, location, ...props }) => (
	<div className="amped-sidebar">
		<List>
			{ navigation.map(( item, i ) => (
				item.type && item.type === 'title' ? (
					<TitleItem key={i} {...item} {...props} />
				) : (
					<NavItem key={i} {...item} {...props}  active={location.pathname === item.url} />
				)
			) ) }
		</List>

		<div className="amped-sidebar__last_updated">Last updated: September 3rd 2017</div>

	</div>
);

export default Sidebar;
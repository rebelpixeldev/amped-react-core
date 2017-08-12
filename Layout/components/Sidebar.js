import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';


const NavItem = ( props ) => (
	<ListItem className="amped-sidebar__item" primaryText={props.label} leftIcon={<props.icon />} onClick={() => props.router.push(props.url)} />
);

export const Sidebar = (props) => (
	<div className="amped-sidebar">
		<List>
			{ props.navigation.map(( item, i ) => (
				<NavItem key={i} {...item} {...props} />
			) ) }
		</List>
	</div>
);

export default Sidebar;
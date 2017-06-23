import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router';
import SidebarComponent from '../components/Sidebar'

import SocialPeople from 'material-ui/svg-icons/social/people';
import PermMedia from 'material-ui/svg-icons/action/perm-media';

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */


const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings,
	navigation : [
		{ label : 'Users', icon : SocialPeople, url : '/crud/view/users' },
		{ label : 'Media Library', icon : PermMedia, url : '/file/library' }
	],

})

class Sidebar extends React.Component{

	constructor(props){
		super(props);
		this.props = props;
	}

	render(){
		return (
			<SidebarComponent {...this.props} />
		)
	}

}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default withRouter(connect(mapStateToProps)(Sidebar))

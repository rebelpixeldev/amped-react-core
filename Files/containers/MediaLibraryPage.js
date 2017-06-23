import React from 'react';

import { connect } from 'react-redux'
import MediaLibraryComponent from '../components/MediaLibraryPage'
import { AmpedTransitionPage } from 'amped-react-core/Core';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.amped.settings,

});

class MediaLibraryPage extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div key="media-library-page">
				<AmpedTransitionPage name="amp-media-library-page">
					<MediaLibraryComponent />
				</AmpedTransitionPage>
			</div>
		)
	}

}

export default connect(mapStateToProps)(MediaLibraryPage);

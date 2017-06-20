import { connect } from 'react-redux'
import MediaLibraryModalTrigger from '../components/MediaLibraryModalTrigger'

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
});

export default connect(mapStateToProps)(MediaLibraryModalTrigger);

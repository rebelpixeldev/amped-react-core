import { connect } from 'react-redux'
import UserProfilePage from '../components/UserProfilePage'

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,

});

export default connect(mapStateToProps)(UserProfilePage);

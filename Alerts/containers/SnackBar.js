import { connect } from 'react-redux'
import SnackBar from '../components/SnackBar'

const mapStateToProps = (state) => ({
	user : true,
	data : state.amped.alerts.snackbar,

});

export default connect(mapStateToProps)(SnackBar);

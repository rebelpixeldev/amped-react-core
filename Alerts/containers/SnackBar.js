import { connect } from 'react-redux'
import SnackBar from '../components/SnackBar'

const mapStateToProps = (state) => ({
	data : state.amped.alerts.snackbar,

});

export default connect(mapStateToProps)(SnackBar);

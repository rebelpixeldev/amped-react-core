import { connect } from 'react-redux'
import Confirm from '../components/Confirm'

const mapStateToProps = (state) => ({
	user : true,
	data : state.amped.alerts.confirm

});

export default connect(mapStateToProps)(Confirm);

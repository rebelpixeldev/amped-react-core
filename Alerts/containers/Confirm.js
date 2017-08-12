import { connect } from 'react-redux'
import Confirm from '../components/Confirm'

const mapStateToProps = (state) => ({
	data : state.amped.alerts.confirm

});

export default connect(mapStateToProps)(Confirm);

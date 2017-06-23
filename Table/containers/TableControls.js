import { connect } from 'react-redux'
import TableControls from '../components/TableControls'

import '../styles/_controls.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
});

export default connect(mapStateToProps)(TableControls);

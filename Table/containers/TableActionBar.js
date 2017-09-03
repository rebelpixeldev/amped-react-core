import { connect } from 'react-redux'
import TableActionBar from '../components/TableActionBar'

import '../styles/_action-bar.scss';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
	items : state.amped.table.actionbar.selectedItems
})

export default connect(mapStateToProps)(TableActionBar);

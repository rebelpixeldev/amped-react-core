import React from 'react';
import { connect } from 'react-redux';
import { default as ModalComponent } from '../components/Modal';

const mapStateToProps = (state) => ({
	data : state.amped.alerts.modal
});


export default connect(mapStateToProps)(ModalComponent);


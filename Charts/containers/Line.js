import React from 'react';
import { connect } from 'react-redux'

import { default as LineComponent } from '../components/Line'
import { AmpedTransitionPage, ampedSocketConnector, AmpedService } from 'amped-react-core/Core';
import { LineChart, AmpedChartFactory } from 'amped-react-core/Charts';

const mapStateToProps = (state) => ({
	user : state.amped.user,
	settings : state.amped.settings,
});


export class Line extends React.Component{

	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			data : []
		}
	}

	componentDidMount(){
		AmpedService.get(`/api/${this.props.model}?order=ASC`)
			.then(( resp ) => {
				this.setState({
					rawData : resp.response,
					data : AmpedChartFactory.prepareForLine(resp.response, this.props.dataKey)
				})
			})
	}

	handleSocketCreate(data){
		const d = data;
		delete d.data;

		const newData = [...this.state.rawData, data];

		this.setState({
			rawData : newData,
			data : AmpedChartFactory.prepareForLine(newData, this.props.dataKey)
		})

	}

	render(){
		return (
			<LineComponent {...this.props} {...this.state} />
		)
	}


}

export default connect(mapStateToProps)(ampedSocketConnector(Line));

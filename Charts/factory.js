
export class AmpedChartFactory{

	static groupByDate(data){
		return data.reduce(( ret, entry ) => {
			const dateStr = entry.created_at.split('T')[0];

			if ( typeof ret[dateStr] === 'undefined')
				ret[dateStr] = [];

			ret[dateStr] = [...ret[dateStr], entry];
			return ret;
		}, {})
	}


	static prepareForLine(data){
		const grouped = this.groupByDate(data);
		return Object.keys(grouped).reduce(( ret, date ) => [...ret, {name:new Date(date).getTime(), value:grouped[date].length, date}], []);
	}

}

export default AmpedChartFactory;
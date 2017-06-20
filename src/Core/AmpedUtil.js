export class AmpedUtil{

	static objectToQueryString(obj){
		return Object.keys(obj).map(( key ) => {
		    return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
		}).join('&');
	}

	static capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

}

export default AmpedUtil;
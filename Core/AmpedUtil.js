export class AmpedUtil{

	static objectToQueryString(obj){
		return Object.keys(obj).map(( key ) => {
		    return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
		}).join('&');
	}

	static capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static truncateToWord(str, words = 20, append = '...'){
		const strParts = str.split(' ');
		return strParts.slice(0, words).join(' ') + (strParts.length <= words ? '' : append );
	}

	static stripHTML(str){
		const tmp = document.createElement('DIV');
		tmp.innerHTML = str;
		return tmp.textContent || tmp.innerText || "";
	}

}

export default AmpedUtil;
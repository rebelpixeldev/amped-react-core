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

	static download(content, filename, mime){
		let a = document.createElement('a');

		if (navigator.msSaveBlob) { // IE10
			navigator.msSaveBlob(new Blob([content], {
				type: mimeType
			}), fileName);
		} else if (URL && 'download' in a) { //html5 A[download]
			a.href = URL.createObjectURL(new Blob([content], {
				type: mime // 'text/csv;encoding:utf-8'
				}));
				a.setAttribute('download', filename);
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			} else {
				location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
			}
	}

}

export default AmpedUtil;
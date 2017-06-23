export class AmpedStorage{

	static tokenName = 'amped-token';

	static getItem(key){
		return localStorage.getItem(key);
	}

	static removeItem(key){
		localStorage.removeItem(key);
	}

	static getToken(){
		return localStorage.getItem(this.tokenName);
	}

	static removeUserToken(){
		localStorage.removeItem(this.tokenName);
	}

}

export default AmpedStorage;
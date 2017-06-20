import { SHOW_SNACK_BAR, HIDE_SNACK_BAR, SHOW_CONFIRM } from 'amped/Alerts/actions';
import { AmpedStorage } from './AmpedStorage';

// import 'whatwg-fetch'

export class AmpedService{

	static user = null;
	static config = null;

	static store = null;


	static getUser(){
		if (this.user === null ){

			const headers = new Headers(Object.assign({'Content-Type' : 'application/json'}, this._defaultHeaders()));

			return fetch(this._buildUrl('/api/user'),
				{ headers })
				.then(this._getBody.bind(this, headers))
				.then(this._parseJSON.bind(this, headers))
				.then(( resp ) => this.user = resp.response);

		} else {
			Promise.resolve(this.user);
		}
	}

	static get(url, data = {}, options = {}, supressSnack = false){
		return AmpedService.request(Object.assign({}, options, {url, data, method: 'GET'}), supressSnack);
	}

	static post(url, data = {}, options = {}, supressSnack = false){
		return AmpedService.request(Object.assign({}, options, {url, data, method: 'POST'}), supressSnack);
	}

	static delete(url, data = {}, options = {}, supressSnack = false){
		return AmpedService.request(Object.assign({}, options, {url, data, method: 'DELETE'}), supressSnack);
	}


	static request(options = {}, supressSnack = false){
		return new Promise((resolve, reject) => {

			const { url, method, data} = Object.assign({method:'get', data: {} }, options);
			const isDataFormData = typeof data.append !== 'undefined';
			const headers = new Headers(Object.assign({}, this._defaultHeaders(), (options.headers || {} )));
			const body = ( method.toLowerCase() === 'get' || method.toLowerCase() === 'delete' ) ?
				options : (
					//headers.get('Content-Type') !== null && headers.get('Content-Type') === 'application/json' ?
					typeof data.append === 'undefined' ?
						JSON.stringify(data) : data
				);

			if ( !isDataFormData )
				headers.append('Content-Type', 'application/json');

			const req = new Request(this._buildUrl(url), {
				method : method.toLowerCase(),
				headers,
				body
					//data
					// (isDataFormData ? data : Object.keys(data).reduce(( formData, key ) => {
					// 	formData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
					// 	return formData;
					// }, new FormData()))
			});

			fetch(req)
				.then(this._getBody.bind(this, req.headers))
				.then(this._parseJSON.bind(this, req.headers))
				.then((resp) => {
					if ( resp.message !== '' )
						AmpedService.store.dispatch({type : SHOW_SNACK_BAR, message : resp.message, level : resp.success ? 'success' : 'error'});

					// AmpedService.store.dispatch({type : SHOW_CONFIRM, message : 'ARE YOU SURE?!?!'});

					if ( resp.success )
						resolve(resp);
					else
						throw resp;

				}).catch((err) => {
					reject(err);
			})

		})
	}

	static _buildUrl(url){
		return `${AmpedService.store.getState().amped.settings.urls.api.domain}${url}`;
	}

	static _getBody(headers, resp){
		return headers !== null && headers.get('Content-Type') === 'application.json' ? resp.json() : resp.text();
	}

	static _parseJSON(headers, resp){
		try {
			return JSON.parse(resp);
		}catch(e){
			return resp;
		}
	}

	static _defaultHeaders(){
		return { 'Authorization' : AmpedStorage.getToken() }
	}
}

export default AmpedService;
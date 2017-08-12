import  * as io from 'socket.io-client';
import { AmpedUtil, AmpedStorage } from 'amped-react-core/Core';


export class AmpedSocket{

	static socket = null;
	static _store = null;


	static setup(store){
		this._store = store;
		this.connect();
	}

	static connect(){
		console.log('CONNECtING');
		if ( this.socket === null && AmpedStorage.getToken() !== null ){
			this.socket = io.connect(this._store.getState().amped.settings.urls.socket.domain, {
				query : AmpedUtil.objectToQueryString({
					authorization : AmpedStorage.getToken()
				})
			});
			this.addListeners();
		}
	}

	static getSocket(){
		if ( this.socket === null )
			return {on : (  ) => {} }
		return this.socket;
	}

	static addListeners() {
		const onevent = this.socket.onevent;
		this.socket.onevent = function (packet) {
			const args = packet.data || [];
			onevent.call (this, packet);    // original call
			packet.data = ["*"].concat(args);
			onevent.call(this, packet);      // additional call to catch-all
		};
	}
}

export default AmpedSocket;
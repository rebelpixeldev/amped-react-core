import { AmpedService } from './AmpedService';
import { AmpedSocket } from './AmpedSocket';
import { AmpedUtil } from './AmpedUtil';
import { AmpedStorage } from './AmpedStorage';

export { default as ampedSocketConnector } from './components/SocketConnector';
export { default as AmpedApp } from './containers/AmpedApp';
export { default as AmpedTransitionPage } from './containers/TransitionPage';
export ampedReducers from './reducers/';

export { AmpedService, AmpedUtil, AmpedSocket, AmpedStorage };



export const AmpedSetup = (store) => {
	AmpedService.store = store;
	AmpedSocket.setup(store);
}

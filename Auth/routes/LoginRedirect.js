
export default (store, reducer) => ({
	path : '/login/:token',
	getComponent (nextState, cb) {

		localStorage.setItem('amped-token', nextState.params.token);

		// browserHistory.push('/');
		window.location = '/';

		// console.log(nextState);
	}
})

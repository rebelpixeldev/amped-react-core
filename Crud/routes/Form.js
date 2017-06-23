
export default (store, reducer) => (
	['/crud/edit/:model', '/crud/edit/:model/:id'].reduce((ret, path) => {
	    return [
		    ...ret,
		    {
			    path,
			    /*  Async getComponent is only invoked when route matches   */
			    getComponent (nextState, cb) {
				    /*  Webpack - use 'require.ensure' to create a split point
				     and embed an async module loader (jsonp) when bundling   */
				    require.ensure([], (require) => {
					    /*  Webpack - use require callback to define
					     dependencies for bundling   */
					    const Component = require('../containers/Form').default;
					    const reducer = require('../reducers/table').default;

					    /*  Add the reducer to the store on key 'counter'  */
					    reducer(store, { key: 'crud', reducer })

					    /*  Return getComponent   */
					    cb(null, Component)

					    /* Webpack named bundle   */
				    }, 'counter')
			    }
		    }
	    ]
	}, []));

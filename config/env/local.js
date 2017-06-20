const config = {
	urls: {
		api: {
			protocol: 'http',
			host: 'localhost',
			port: '4000'
		},
		site: {
			protocol: 'http',
			host: 'localhost',
			port: '3000'
		},
		socket : {
			protocol: 'http',
			host: 'localhost',
			port: '4000'
		}
	}
}

Object.keys(config.urls).forEach((name) => {
	const ref = config.urls[name];
	let url = '';
	url += (typeof ref.protocol === 'undefined' ? 'http' : ref.protocol) + '://';
	url += ref.host;
	if (typeof ref.port !== 'undefined')
		url += `:${ref.port}`;
	ref.domain = url;
});

module.exports = config
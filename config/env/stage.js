const config = {
	urls: {
		api: {
			protocol: 'http',
			host: 'api.amped.rebelpixel.ca',
			port: ''
		},
		site: {
			protocol: 'http',
			host: 'amped.rebelpixel.ca',
			port: ''
		},
		socket: {
			protocol: 'http',
			host: 'api.amped.rebelpixel.ca',
			port: ''
		},
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
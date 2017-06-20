const env = process.env.NODE_ENV || 'local'

module.exports = Object.assign(require('./env/all'), require(`./env/${env}`));
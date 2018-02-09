const mongoName = 'ui-rest-permissions-keystone'
const mongoUser = 'userKeystone'
const mongoPass = 'keystone123'
const mongoAuthSource = 'admin'

const mongoIp = 'localhost'
const mongoPort = '27017'

function getMongoUrl(ip, port, name, user, pass, authSource) {
	return 'mongodb://' + (user && pass ? (user + ':' + pass + '@') : '') + ip + ':' + port + '/' + name + '?' + (authSource ? 'authSource=' + authSource : '')
}

module.exports = {
	apps: [{
		name: 'ui.rest.permissions.keystone',
		script: 'keystone.js',
		watch: true,
		env: {
			'PORT': 8088,
			'COOKIE_SECRET': 'dRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t',
			'NODE_ENV': 'development',
			'AUTO_UPDATE': true,
			'MONGO_URI': getMongoUrl('localhost', mongoPort, mongoName)
		},
		env_production: {
			'PORT': 8001,
			'COOKIE_SECRET': 'dRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t',
			'NODE_ENV': 'production',
			'AUTO_UPDATE': true,
			'MONGO_URI': getMongoUrl(mongoIp, mongoPort, mongoName, mongoUser, mongoPass, mongoAuthSource)
		}
	}]
}

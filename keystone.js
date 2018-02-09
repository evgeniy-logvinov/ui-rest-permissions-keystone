// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config()
require('./require.js')

// Require keystone
var keystone = require('keystone')

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'ui.rest.permissions.keystone',
	'brand': 'ui.rest.permissions.keystone',
	'mongo': process.env.MONGO_URI,

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'signin logo': ['/logo.svg', 228, 158], // relative to public directory

	'auto update': (process.env.AUTO_UPDATE === 'true'),
	'session': true,
	'auth': true,
	'user model': 'SecurityUser',
	'role model': 'SecurityRole',                    // use whatever name for the role model
	'permission model': 'SecurityPermission'        // use whatever name for the permission model
})

// Load your project's Models
keystone.import('lib/models')
// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
})

keystone.set('cors allow origin', true)

// Load your project's Routes
keystone.set('routes', requireRoot('lib/routes'))

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	'Users': ['security-users', 'security-roles', 'security-permissions'],
})

// Start Keystone to connect to your database and initialise the web server
keystone.start()
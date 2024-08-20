const moment = require('moment')

function messageFormat(username, text) {
	return {
		username,
		text,
		time: moment().format('h:mn a'),
	}
}

module.exports = messageFormat

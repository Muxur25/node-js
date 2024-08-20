const Pool = require('pg').Pool

const pool = new Pool({
	user: 'postgres',
	password: '1234567',
	database: 'probabook',
	host: 'localhost'
})


module.exports = pool
const Pool = require('pg').Pool

const pool = new Pool({
	user: 'postgres', // default holatda shunday boladi
	password: '1234567', // passwordimizni kiritamiz ornatish jarayonidagi
	database: 'user_list', // database nomi
	host: 'localhost', // host nomi
	port: 5432,
})

module.exports = pool

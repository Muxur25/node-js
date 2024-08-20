const User = require('../models/users')

const pool = require('../config/db')

//Route     /
//Method    GET
//Descr     Get main page
const getMainPage = async (req, res) => {
	// const user = await pool.query('SELECT * FROM user_info') // user infodan hamma malumotlarni oldik

	// agar ozimiz malumot kiritmoqchi bolsak database mizdan user infodan
	// query tool degan joyga kiramizda
	// INSERT INTO user_info (username, age) VALUES ('Muxur', 21)
	// shunday malumot kiritamiz

	const users = await User.findAll()

	res.render('main', {
		title: 'User list',
		users,
	})
}

//Route     /:uid
//Method    GET
//Descr     Get user page by uid
const getUserPageByUid = async (req, res) => {
	try {
		// const user = await pool.query('SELECT * FROM user_info WHERE id = $1', [
		// 	req.params.id,
		// ])

		const user = await User.findByid(req.params.id)

		res.render('user-page', {
			title: user.username,
			user,
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getMainPage,
	getUserPageByUid,
}

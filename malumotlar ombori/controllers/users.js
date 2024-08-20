const pool = require('../config/db')
const User = require('../models/users')
//Route     /add-users
//Method    GET
//Descr     Get add-users page
const getAddUsersPage = (req, res) => {
	res.render('add-users', {
		title: 'Add new user',
	})
}

//Route     /users
//Method    POST
//Descr     add new user
const addNewUser = async (req, res) => {
	try {
		await User.addUser(req.body.username, req.body.age)
		res.redirect('/')
	} catch (error) {
		console.log(error)
	}
}

const editUser = async (req, res) => {
	// const user = await pool.query('select * from user_info where id = $1', [
	// 	req.params.id,
	// ])
	const user = await User.editPage(req.params.id)
	try {
		res.render('edit-user', {
			title: 'Edit page',
			user,
		})
	} catch (error) {
		console.log(error)
	}
}

const updateUser = async (req, res) => {
	// await pool.query(
	// 	'update user_info set username = $1, age = $2 where id = $3',
	// 	[req.body.username, req.body.age, req.params.id]
	// )
	await User.updateUsers(req.body.username, req.body.age, req.params.id)
	try {
		res.redirect('/')
	} catch (error) {
		console.log(error)
	}
}

const deleteUser = async (req, res) => {
	// await pool.query('delete from user_info where id = $1', [
	// 	req.params.id,
	// ])
	await User.deleteUser(req.params.id)
	try {
		res.redirect('/')
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getAddUsersPage,
	addNewUser,
	editUser,
	updateUser,
	deleteUser,
}

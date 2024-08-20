const db = require('../models/index')
const User = db.user
const Diery = db.diery
const bcrypt = require('bcrypt')

const myProfile = async (req, res) => {
	try {
		const {username, email, id} = req.session.user
		const diery = await Diery.findAll({where: {userId: id}, raw: true})
		console.log(diery)
		res.render('auth/my-profile', {
			title: "my profile",
			email,
			username,
			dierys: diery.length,
			isAuth: req.session.isAuth
		})
	}catch (error) {
		console.log(error)
	}
}

const getUserProfile = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {raw: true})
		const diery = await Diery.findAll({where: {userId: req.params.id}})
		res.render('auth/user-profile', {
			title: user.username,
			email: user.email,
			password: user.password,
			username: user.username,
			isAuth: req.session.isAuth,
			dierys: diery.length
		})
	}catch (error) {
		console.log(error)
	}
}

const updateUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.session.user.id)
		const {email, username, password, password2} = req.body
		const isTek = await  bcrypt.compare(password2, user.password)
		if (isTek){
			const hashPass = await bcrypt.hash(password, 10)
			await User.update({email, username, password: hashPass}, {
				where: {
					id: req.session.user.id
				}
			})
			const data = await User.findOne({where: {email}})
			req.session.user = data
			req.session.save()
			res.redirect('/profile/my')
		}else {
			res.redirect('/profile/update')
		}
	}catch (error){
		console.log(error)
	}
}

const updatePage = async (req, res) => {
	try {
		res.render('auth/update-profile', {
			title: 'updatePassword',
			isAuth: req.session.isAuth,
			email: req.session.user.email,
			username: req.session.user.username
		})
	}catch (error){
		console.log(error)
	}
}



module.exports = {myProfile, getUserProfile, updatePage, updateUser}
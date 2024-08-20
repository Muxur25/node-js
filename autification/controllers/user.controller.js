const db = require('../models/index')
const User = db.user
const bcrypt = require('bcrypt')

const loginPage = async (req, res) => {
	try {
		const isAuth = req.session.isAuth
		// const isAuth = req.get('Cookie').split('=')[1] === 'true'
		res.render('auth/login', {
			title: 'Login',
			isAuth
		})
	} catch (error) {
		console.log(error)
	}
}

const loginUser = async (req, res) => {
	try {
		const {email, password} = req.body
		const excistUser = await User.findOne({where: {email}})
		
		if(excistUser){
			const excistPass = await bcrypt.compare(password, excistUser.password)
			if (excistPass){
				req.session.isAuth = true
				req.session.user = excistUser
				req.session.save((err) => {
					if (err) throw err
					res.redirect('/diery/my')
				})
			}else {
				res.redirect('/auth/login')
			}
		}else {
			res.redirect('/auth/login')
		}
		
		
		
	
		
	
		
	} catch (error) {
		console.log(error)
	}
}

const logout = async (req, res) => {
	req.session.destroy(() => {
		res.redirect('/auth/login')
	})
}

const registerPage = async (req, res) => {
	try {
		res.render('auth/register', {
			title: 'Register page'
		})
	}catch (error) {
		console.log(error)
	}
}

const registerUser = async (req, res) => {
	try {
		const {email, name, password, password2} = req.body
		if(password != password2){
			 res.redirect('/auth/register')
		}
		const excistUser = await User.findOne({where:  {email}})
		if (excistUser){
			res.redirect('/auth/register')
		}
		const hash = await bcrypt.hash(password, 10)
		
		await User.create({
			email, name, password: hash, username:name
		})
		res.redirect('/auth/login')
	}catch (error){
		console.log(error)
	}
}

module.exports = { loginPage, loginUser, logout, registerPage, registerUser }

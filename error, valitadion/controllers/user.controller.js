const db = require('../models/index')
const User = db.user
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')



const loginUser = async (req, res) => {
	try {
		const {email, password} = req.body
		const errors = validationResult(req)
		const isAuth = req.session.isAuth
		if (!errors.isEmpty()){
			console.log(errors.array())
			 return res.render('auth/login', {
				title: "login",
				isAuth,
				yoqlama: errors.array()[0].msg ,
				oldValue: {
					email, password
				}
			})
		}
		
		
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
				req.flash('errorPass', 'Parol xato kiritildi')
				res.redirect('/auth/login')
			}
		}else {
			req.flash('yoq', 'Bunday email bilan foydalanuvchi royxatdan otmagan')
			res.redirect('/auth/login')
		}
		
	} catch (error) {
		console.log(error)
	}
}

const loginPage = async (req, res) => {
	try {
		const isAuth = req.session.isAuth
		// const isAuth = req.get('Cookie').split('=')[1] === 'true'
		res.render('auth/login', {
			title: 'Login',
			isAuth,
			errorPass: req.flash('errorPass'),
			yoq: req.flash('yoq')
		})
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
			title: 'Register page',
			error: req.flash('error'),
			errorPass: req.flash('errorPass')
		})
	}catch (error) {
		console.log(error)
	}
}

const registerUser = async (req, res) => {
	try {
		const {email, name, password, password2} = req.body
		const error = validationResult(req)
		if (!error.isEmpty()){
			return res.render('auth/register', {
				title: 'Register page',
				error: error.array()[0].msg ,
				errorPass: req.flash('errorPass'),
				oldValue: {
					email, name, password, password2
				}
			})
		}
		
		
		if(password != password2){
			req.flash('errorPass', "Parollar bir biriga mos emasku tonka")
			res.redirect('/auth/register')
		}
		const excistUser = await User.findOne({where:  {email}})
		if (excistUser){
			req.flash('error', 'Bu foydalanuvchi avval royxatdan otgan')
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

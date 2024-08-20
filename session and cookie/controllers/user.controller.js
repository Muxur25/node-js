const db = require('../models/index')
const User = db.user

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
		// res.setHeader('Set-Cookie', 'isLogin=true') cookide endi islogin degan ozgaruvchi bor uni qiymati true
		req.session.isAuth = true
		req.session.user = {
			id: 1,
			email: 'salom@mail.com',
			password: 'salom123',
			username: 'muxriddin'
		}
		req.session.save(err => {
			if(err) throw err
			res.redirect('/diery/my')
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

module.exports = { loginPage, loginUser, logout }

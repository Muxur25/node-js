const procAuth = (req, res, next) => {
	if(!req.session.isAuth){
		res.redirect('/auth/login')
	}
	next()
}

const borUser = (req, res, next) => {
	if (req.session.isAuth){
		res.redirect('/diery/my')
		
	}
	next()
}

module.exports = {procAuth, borUser}
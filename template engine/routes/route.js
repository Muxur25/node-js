const path = require('path')

const { Router } = require('express')

const router = Router()

router.get('/forma', (req, res) => {
	// get sorov yuborayapmiz
	res.render('users', {title: 'Add users'})
})
const route = []
router.post('/salom', (req, res) => {
	// post sorov yuborayapmiz
	res.redirect('/') // hammasi yakunlangandan song bosh sahifaga otvoradi
	route.push(req.body)
})

exports.router = router
exports.route = route

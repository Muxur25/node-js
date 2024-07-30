const { Router } = require('express')
const { route } = require('./route')
const router = Router()
const path = require('path')
router.get('/', (req, res) => {
	res.render('main', { route })
})

module.exports = router

const express = require('express')
const { loginPage, loginUser, logout } = require('../controllers/user.controller')

const router = express.Router()

router.get('/login', loginPage)

router.post('/login', loginUser)

router.get('/logout', logout)

module.exports = router

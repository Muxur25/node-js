const express = require('express')
const { loginPage, loginUser, logout, registerPage, registerUser } = require('../controllers/user.controller')
const {procAuth, borUser} = require('../middleware/auth.middle')

const router = express.Router()

router.get('/login', borUser, loginPage)

router.post('/login', borUser, loginUser)

router.get('/logout', procAuth, logout)

router.get('/register', borUser, registerPage)

router.post('/register/user', borUser, registerUser)

module.exports = router

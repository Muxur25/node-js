const express = require('express')
const { loginPage, loginUser, logout, registerPage, registerUser } = require('../controllers/user.controller')
const {procAuth, borUser} = require('../middleware/auth.middle')

const router = express.Router()

const {body,check} = require('express-validator')

router.get('/login', borUser, loginPage)

router.post('/login', [check('email').isEmail().withMessage('Emailni togri kirit'), body('password').isLength({min: 6}).withMessage('Parol 6 ta belgidan kop bolish kerak')], borUser, loginUser)

router.get('/logout', procAuth, logout)

router.get('/register', borUser, registerPage)

router.post('/register/user', [check('email', "Emailni togri kirit").isEmail(), body('password').isLength({min: 6}).withMessage('Parol 6 ta belgidan kop bolish kerak')], borUser, registerUser)

module.exports = router

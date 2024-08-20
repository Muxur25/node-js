const express = require('express')
const authController = require('../controllers/auth.controller')
const { protected } = require('../middleware/auth')
const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.get('/profile', protected, authController.profile)

router.put('/update', protected, authController.update)

router.put('/update-password', protected, authController.updatePassword)

router.put('/balance', protected, authController.balandUpdate)

router.put('/activ', protected, authController.activateStatus)

module.exports = router

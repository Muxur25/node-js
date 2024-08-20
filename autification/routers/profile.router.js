const express = require('express')
const { myProfile, getUserProfile, updatePage, updateUser } = require('../controllers/profile.controller')
const {procAuth} = require('../middleware/auth.middle')


const router = express.Router()


router.get('/my', procAuth, myProfile)
router.get('/user/:id', procAuth, getUserProfile)
router.get('/update', procAuth, updatePage)
router.post('/update/action', procAuth, updateUser)


module.exports = router
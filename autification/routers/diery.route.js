const express = require('express')
const {
	getAllDiery,
	addNewDiery,
	getOneDiery,
	updateDiery,
	updatePage,
	deleteDiery,
	addComment,
	getMyDiery
} = require('../controllers/diery.controller')

const {procAuth} = require('../middleware/auth.middle')
const { updateMiddle } = require('../middleware/updateDiery.middle')



const router = express.Router()

router.get('/my', procAuth, getMyDiery)

router.get('/all', procAuth, getAllDiery)

router.post('/add', procAuth, addNewDiery)

router.get('/:id', procAuth, getOneDiery)

router.get('/update/:id', procAuth, updateMiddle, updatePage)

router.post('/update/one/:id', procAuth, updateMiddle, updateDiery)

router.post('/delete/one/:id', procAuth, updateMiddle, deleteDiery)

router.post('/comment/:id', procAuth, addComment)

module.exports = router

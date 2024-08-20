const express = require('express')
const {
	getAllDiery,
	addNewDiery,
	getOneDiery,
	updateDiery,
	updatePage,
	deleteDiery,
	addComment,
} = require('../controllers/diery.controller')

const router = express.Router()

router.get('/my', getAllDiery)

router.post('/add', addNewDiery)

router.get('/:id', getOneDiery)

router.get('/update/:id', updatePage)

router.post('/update/one/:id', updateDiery)

router.post('/delete/one/:id', deleteDiery)

router.post('/comment/:id', addComment)

module.exports = router

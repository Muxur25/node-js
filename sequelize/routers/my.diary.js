const {
	getMyDiary,
	addMyDiary,
	getMyDiaryOne,
	updatePage,
	updateDiery,
	deleteDiery,
	addComentToDiery,
} = require('../controllers/my.diary')

const express = require('express')

const router = express.Router()

router.get('/my', getMyDiary)

router.post('/add', addMyDiary)

router.get('/:id', getMyDiaryOne)

router.get('/update/:id', updatePage)

router.post('/update/one/:id', updateDiery)

router.post('/delete/one/:id', deleteDiery)

router.post('/comment/:id', addComentToDiery)

module.exports = router

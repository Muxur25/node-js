const express = require('express')
const starController = require('../controllers/star.controller')
const upload = require('../utils/fileUpload')
const { protected, adminAcsess, apiAcsess } = require('../middleware/auth')
const router = express.Router()

router.post(
	'/add',
	upload.single('image'),
	protected,
	adminAcsess,
	starController.addStar
)

router.get('/get-all', apiAcsess, starController.getAll)

router.get('/get/:id', apiAcsess, starController.getOne)

router.put('/update/:id', protected, adminAcsess, starController.updateStar)

router.delete('/delete/:id', protected, adminAcsess, starController.delete)

module.exports = router

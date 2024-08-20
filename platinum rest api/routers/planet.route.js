const { Router } = require('express')
const planetController = require('../controllers/planet.controller')
const upload = require('../utils/fileUpload')
const { protected, adminAcsess, apiAcsess } = require('../middleware/auth')

const router = Router()

router.get('/all', apiAcsess, planetController.getAll)

router.post(
	'/add',
	upload.single('image'),
	protected,
	adminAcsess,
	planetController.add
)

router.get('/get-one/:id', apiAcsess, planetController.getOne)

router.put('/update/:id', protected, adminAcsess, planetController.update)

router.delete('/delete/:id', protected, adminAcsess, planetController.delete)

module.exports = router

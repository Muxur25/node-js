const asyncHandler = require('../middleware/async')
const planetService = require('../services/planet.service')

class PlanetController {
	getAll = asyncHandler(async (req, res, next) => {
		const page = +req.query.page
		const data = await planetService.getAll(page)
		res.json(data)
	})

	add = asyncHandler(async (req, res, next) => {
		const params = req.body
		const image = 'uploads/' + req.file.filename
		const star = req.body.star
		const data = await planetService.add({ ...params, image }, star)
		res.json(data)
	})

	getOne = asyncHandler(async (req, res, next) => {
		const id = req.params.id
		const data = await planetService.getOne(id)
		res.json(data)
	})

	delete = asyncHandler(async (req, res, next) => {
		const id = req.params.id
		const { message } = await planetService.delete(id)
		res.json(message)
	})

	update = asyncHandler(async (req, res, next) => {
		const body = req.body
		const id = req.params.id
		const data = await planetService.update({ ...body }, id)
		res.json(data)
	})
}

module.exports = new PlanetController()

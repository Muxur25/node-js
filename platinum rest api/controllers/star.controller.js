const asyncHeandler = require('../middleware/async')
const starService = require('../services/star.service')

class StarController {
	getAll = asyncHeandler(async (req, res, next) => {
		const page = req.query.page
		const data = await starService.getAll(page)
		res.json(data)
	})

	addStar = asyncHeandler(async (req, res, next) => {
		const ham = req.body
		const image = 'uploads/' + req.file.filename
		const data = await starService.addStar({ ...ham, image })
		res.status(201).json(data)
	})

	getOne = asyncHeandler(async (req, res, next) => {
		const id = req.params.id
		const data = await starService.getOne(id)
		res.json(data)
	})

	updateStar = asyncHeandler(async (req, res, next) => {
		const id = req.params.id
		const body = req.body
		const data = await starService.updateStar({ ...body, id })
		res.json(data)
	})

	delete = asyncHeandler(async (req, res, next) => {
		const id = req.params.id
		const { message } = await starService.delete(id)
		res.json(message)
	})
}

module.exports = new StarController()

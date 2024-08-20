const planetModel = require('../models/planet.model')
const starModel = require('../models/star.model')
const ErrorResponse = require('../utils/errorResponse')

class PlanetService {
	async getAll(page) {
		const limit = 2
		const all = await planetModel.countDocuments()

		const data = await planetModel
			.find()
			.skip(page * limit - limit)
			.limit(limit)
		return { data, PageCount: Math.ceil(all / limit), totalPage: page }
	}

	async add(params, starName) {
		const starOld = await starModel.findOne({ name: starName })
		const data = await planetModel.create({ ...params, star: starOld._id })

		await starModel.findOneAndUpdate(
			{ name: starName },
			{ $push: { planets: data._id } },
			{ new: true }
		)
		return data
	}

	async update(params, id) {
		if (!id) {
			throw ErrorResponse('Planeta mavjud emas')
		}

		const data = await planetModel.findByIdAndUpdate(
			id,
			{
				...params,
			},
			{ new: true }
		)

		return data
	}

	async delete(id) {
		if (!id) {
			throw ErrorResponse('Bunday planeta mavjud emas')
		}

		const data = await planetModel.findByIdAndDelete(id)

		return { message: 'Planeta ochirildi ' + data.name }
	}

	async getOne(id) {
		if (!id) {
			throw ErrorResponse('Bunday planeta mavjud emas')
		}
		const data = await planetModel.findById(id)
		return data
	}
}

module.exports = new PlanetService()

const starModel = require('../models/star.model')
const ErrorResponse = require('../utils/errorResponse')

class StarService {
	async getAll(page) {
		const limit = 2
		const all = await starModel.countDocuments()

		const data = await starModel
			.find()
			.skip(page * limit - limit)
			.limit(limit)
		return {
			data,
			countPage: Math.ceil(all / limit),
			page,
		}
	}

	async addStar(mal) {
		const data = await starModel.create({ ...mal })
		return data
	}

	async getOne(id) {
		if (!id) {
			throw ErrorResponse.Xato('Yulduz mavjud emas')
		}

		return await starModel.findById(id)
	}

	async updateStar(params) {
		const { name, temperature, massa, diametr, image, id } = params
		const data = await starModel.findById(id)
		if (!data) {
			throw ErrorResponse('Bunday yulduz mavjud emas')
		}
		const newData = await starModel.findByIdAndUpdate(
			id,
			{
				name,
				temperature,
				massa,
				diametr,
				image,
			},
			{ new: true }
		)

		return newData
	}

	async delete(id) {
		if (!id) {
			throw ErrorResponse('Bunday yulduz mavjud emas')
		}

		const data = await starModel.findByIdAndDelete(id)
		return { message: 'Data deleted ' + data._id }
	}
}

module.exports = new StarService()

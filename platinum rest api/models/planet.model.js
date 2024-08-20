const { Schema, model } = require('mongoose')

const planetSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quyoshgachaMasofa: {
			type: String,
			required: true,
		},
		diametr: {
			type: String,
			required: true,
		},
		yearDuration: {
			type: String,
			required: true,
		},
		dayDuration: {
			type: String,
			required: true,
		},
		temperature: {
			type: String,
			required: true,
		},
		tartibRaqami: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		star: {
			type: Schema.ObjectId,
			ref: 'Star',
		},
	},
	{ timestamps: true }
)

module.exports = model('Planet', planetSchema)

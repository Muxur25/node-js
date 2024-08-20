const { Schema, model } = require('mongoose')

const starSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		temperature: {
			type: String,
			required: true,
		},
		massa: {
			type: String,
			required: true,
		},
		diametr: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		planets: [{ type: Schema.ObjectId, ref: 'Planet' }],
	},
	{ timestamps: true }
)

module.exports = model('Star', starSchema)

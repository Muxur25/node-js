const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			uniqe: true,
			match: [
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				'Please enter valite email adress',
			],
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		adminStatus: {
			type: Boolean,
			default: false,
		},
		apiKey: {
			type: String,
			required: true,
			uniqe: true,
		},
		balance: {
			type: Number,
			default: 0,
		},
		isActiv: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.hashPasswords = async function (passwords) {
	return await bcrypt.compare(passwords, this.password)
}

userSchema.methods.genereteToken = async function () {
	return await jwt.sign(
		{ id: this._id, email: this.email },
		process.env.JWT_TOKEN,
		{ expiresIn: '1d' }
	)
}

module.exports = model('User', userSchema)

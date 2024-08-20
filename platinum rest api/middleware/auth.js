const userModel = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('./async')
const jwt = require('jsonwebtoken')

exports.protected = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization) {
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return next(ErrorResponse.Unautorizent())
	}

	const verify = jwt.verify(token, process.env.JWT_TOKEN)

	if (!verify) {
		return next(ErrorResponse.Unautorizent())
	}

	req.user = await userModel.findById(verify.id)

	next()
})

exports.adminAcsess = asyncHandler(async (req, res, next) => {
	if (!req.user.adminStatus) {
		return next(ErrorResponse.Xato('Siz admin emassz'))
	}

	next()
})

exports.apiAcsess = asyncHandler(async (req, res, next) => {
	let key
	console.log(req.headers['apikey'])

	if (req.headers['apikey']) {
		key = req.headers['apikey']
	}

	if (!key) {
		return next(ErrorResponse.Xato('Api key mavjud emas'))
	}

	const user = await userModel.findOne({ apiKey: key })

	if (!user) {
		return next(ErrorResponse.Xato('User topilmayapdi'))
	}

	if (!user.isActiv) {
		return next(ErrorResponse.Xato('Activ emas'))
	}

	next()
})

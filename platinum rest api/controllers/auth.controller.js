const authService = require('../services/auth.service')
const asyncHeandler = require('../middleware/async')

class AuthController {
	register = asyncHeandler(async (req, res, next) => {
		const { name, email, password } = req.body
		const { data, token } = await authService.register(name, email, password)
		res.status(201).json({ data, token })
	})

	login = asyncHeandler(async (req, res, next) => {
		const { email, password } = req.body
		const { user, token } = await authService.login(email, password)

		res.json({ user, token })
	})

	profile = asyncHeandler(async (req, res, next) => {
		const id = req.user._id
		const data = await authService.profile(id)
		res.json(data)
	})

	update = asyncHeandler(async (req, res, next) => {
		const id = req.user._id
		const body = req.body
		const data = await authService.update({ ...body }, id)
		res.json(data)
	})

	updatePassword = asyncHeandler(async (req, res, next) => {
		const id = req.user._id
		const { password, oldPassword } = req.body
		const { message, token } = await authService.updatePassword(
			password,
			oldPassword,
			id
		)
		res.json({ message, token })
	})

	balandUpdate = asyncHeandler(async (req, res, next) => {
		const { summa } = req.body
		const id = req.user._id
		const { message } = await authService.balandUpdate(id, summa)
		res.json(message)
	})

	activateStatus = asyncHeandler(async (req, res, next) => {
		const user = req.user
		const { message } = await authService.activateStatus(user)
		res.json(message)
	})
}

module.exports = new AuthController()

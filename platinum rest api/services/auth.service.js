const uuid = require('uuid')
const userModel = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse')

class AuthService {
	async register(name, email, password) {
		const apiKey = uuid.v4()
		const data = await userModel.create({
			name,
			email,
			password,
			apiKey,
		})
		const token = await data.genereteToken()
		return { data, token }
	}

	async login(email, password) {
		if (!email || !password) {
			throw ErrorResponse.Xato('Email yoki password kiritmadingiz')
		}
		const user = await userModel.findOne({ email })
		if (!user) {
			throw ErrorResponse.Xato('User mavjud emas')
		}
		const passwordHash = await user.hashPasswords(password)

		if (!passwordHash) {
			throw ErrorResponse.Xato('Parol xato')
		}
		const token = await user.genereteToken()
		return { user, token }
	}

	async profile(id) {
		if (!id) {
			throw ErrorResponse.Xato('User topilmadiku')
		}

		return await userModel.findById(id)
	}

	async update(params, id) {
		if (!id) {
			throw ErrorResponse.Xato('User topilmadiku')
		}
		return userModel.findByIdAndUpdate(id, { ...params }, { new: true })
	}

	async updatePassword(password, oldPassword, id) {
		const user = await userModel.findById(id)
		const data = await user.hashPasswords(oldPassword)
		if (!data) {
			throw ErrorResponse.Xato('Parol mos emas')
		}

		user.password = password
		await user.save()
		const token = await user.genereteToken()
		return { message: 'Password muaffaqiyatli ozgardi ' + password, token }
	}

	async balandUpdate(id, summa) {
		const user = await userModel.findById(id)
		user.balance += summa
		await user.save()
		return { message: 'Balansingiz ' + summa + " ga to'ldirildi" }
	}

	async activateStatus(user) {
		const isUser = await userModel.findById(user._id)
		let narx = 5000
		let orasi = narx - isUser.balance
		if (isUser.balance < narx) {
			throw ErrorResponse.Xato(
				'Balansingizni yana ' + orasi + " summaga to'ldirishingiz lozim"
			)
		}

		if (isUser.isActiv === true) {
			throw ErrorResponse.Xato('Siz allaqachon obunani yoqqansz')
		}

		await userModel.findByIdAndUpdate(user._id, {
			balance: isUser.balance - narx,
			isActiv: true,
		})
		return { message: "Foydalanuvchi activate bo'ldi" }
	}
}

module.exports = new AuthService()

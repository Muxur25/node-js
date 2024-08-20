const mongoose = require('mongoose')

const connecting = async () => {
	await mongoose.connect(process.env.DB_URL).then(() => {
		console.log('DB connected'.red.bold)
	})
}

module.exports = { connecting }

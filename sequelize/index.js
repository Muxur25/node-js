const express = require('express')

require('dotenv').config

const handle = require('express-handlebars')
const diery = require('./routers/my.diary')

const app = express()
app.use(express.urlencoded({ extended: false }))
const db = require('./models/index')
app.use(express.json())

app.engine('.hbs', handle.engine({ extname: '.hbs' }))

app.set('view engine', '.hbs')

app.use('/diery', diery)

const PORT = 3000 || process.env.PORT

const bootstrap = async () => {
	try {
		await db.sequelize.sync() // { force: true } ozgarishlarni saqlash ucun faqat agar mavjud table boladigan bosa ocirib yuboradi

		app.listen(PORT, () => console.log('Server ishga tushdi'))
	} catch (error) {
		console.log(error)
	}
}

bootstrap()

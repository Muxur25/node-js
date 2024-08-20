const express = require('express')

const handelbars = require('express-handlebars')

const app = express()
const db = require('./models/index')


const session = require('express-session')

const pgStore = require('connect-pg-simple')(session)

require('dotenv').config()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(session({
	secret: 'secret value',
	resave: false, // yani biz har safar sahifani yangilagandan song buni yangilashimz shart emas
	saveUninitialized: false,
	store: new pgStore({
		pool: require('./config/db'),
		tableName: "user_session"
	})
}))

app.engine('.hbs', handelbars.engine({ extname: '.hbs' }))

app.set('view engine', '.hbs')

app.use('/diery', require('./routers/diery.route'))

app.use('/auth', require('./routers/user.router'))

const PORT = process.env.PORT || 4000

const bootstrap = async () => {
	app.listen(PORT, () => console.log('Server runing in port 3000'))
	db.sequelize.sync()
}

bootstrap()

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

const csrf = require('csurf')



app.engine('.hbs', handelbars.engine({ extname: '.hbs' }))

app.set('view engine', '.hbs')



app.use('/diery', require('./routers/diery.route'))
app.use('/profile', require('./routers/profile.router'))

app.use(csrf())
app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken() // endi hammasida csrfToken bor
	next()
})
app.use('/auth', require('./routers/user.router'))



app.use('/', async (req, res) => {
	try {
		if(req.session.isAuth){
			return res.redirect('/diery/my')
		}
		res.redirect('/auth/login')
	}catch (error) {
		console.log(error)
	}
})

const PORT = process.env.PORT || 4000

const bootstrap = async () => {
	app.listen(PORT, () => console.log('Server runing in port 3000'))
	db.sequelize.sync()
}

bootstrap()

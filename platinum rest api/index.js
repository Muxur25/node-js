const express = require('express')
const { connecting } = require('./config/db')
require('dotenv').config()
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/auth', require('./routers/user.route'))

app.use('/api/v1/starts', require('./routers/star.route'))

app.use('/api/v1/planets', require('./routers/planet.route'))

app.use(errorHandler)

const bootstrap = async () => {
	app.listen(process.env.PORT, () => {
		console.log('Port listen to 5500'.white.bold)
		connecting()
	})
}

bootstrap()

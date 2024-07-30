const express = require('express')
const userRoutes = require('./routes/route')
const mainRoutes = require('./routes/main')
const path = require('path')
const app = express()
// const { engine } = require('express-handlebars')

// app.set('view engine', 'pug')

// app.set('view engine', 'hbs')

// app.engine('hbs', engine({ extname: 'hbs' })) // registratsiya qilish

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join('/style/css')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(userRoutes.router)

app.use(mainRoutes)

app.use((req, res) => {
	res.status(404).render('not', { title: 'Page not found' })
})

app.listen(5000)

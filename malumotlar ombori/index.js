const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')

const app = express()

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', 'views')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const userRoutes = require('./routes/users')
const mainRoutes = require('./routes/main')

app.use('/users', userRoutes.router)
app.use(mainRoutes)

app.use((req, res, next) => {
  res.status(404).render('404', {title: 'Page not found'})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server running on PORT: 3000')
})
const express = require('express')
const userRoutes = require('./routes/route')
const mainRoutes = require('./routes/main')
const path = require('path')
const app = express()

app.use(express.json()) // formadagi bodyni oqib olishimiz uchun
app.use(express.urlencoded({ extended: false }))

app.use(userRoutes)

app.use(mainRoutes)

// app.use((req, res) => {
// 	res.status(404).send(`<h1>404 Page not found</h1>`) // networkga ham 404 yuboramiza
// }) // not found pagesi


app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', 'not.html'))
})


app.listen(5000)

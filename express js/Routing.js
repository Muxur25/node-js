const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
	console.log('Bu middlewire xar doim ishlaydi')
	next()
})

app.use('/massage', (req, res, end) => {
	res.send(`<p>Foydalanuvchilar</p>`)
})

app.use('/', (req, res, next) => {
	res.send(`
		<h1>Bosh sahifa</h1>
		<a href="/massage">Foydalanuvchilar</a>
		`)
})

app.listen(3000)

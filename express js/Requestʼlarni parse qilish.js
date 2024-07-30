const express = require('express')


const app = express()

app.use(express.json()) // formadagi bodyni oqib olishimiz uchun
app.use(express.urlencoded({extended: false}))

app.use('/forma', (req, res, next) => {
	res.send(`
	<form action='/salom' method='POST'>
		<input type='text' name='users'>
		<input type='number' name='age'>
		<button type='submit'>Send</button>
	</form>
	
	`)
})

app.use('/salom', (req, res, next) => {
	res.redirect('/') // hammasi yakunlangandan song bosh sahifaga otvoradi
	console.log(req.body) // va consoleda yuborgan sorovimizni koramiz
})

app.use('/', (req, res, next) => {
	res.send(`
		<h1>Bosh sahifa</h1>
		<a href='/forma'>Forma</a>
`)
})

app.listen(3000)
const express = require('express')

const app = express()




app.use((req, res, next) => {
	console.log('Middlewire 1')
	next() // keyingi middleware ga navbat beradi bu
	// middleware royxatdan otkazish bular ortada turish uchun ishlatilinadi yani misolni biri bu foydalanuvci royhattan otgan bosa boshqa sahifa otmagan bosa boshqa sahifa
})

app.use((req, res, next) => {
	console.log('Middlewire 2')
	res.send('Expressdan salomlar')
})

app.listen(3000)

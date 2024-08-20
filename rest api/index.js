const express = require('express')

const app = express()

const cors = require('cors')

app.use(express.json())

app.use('/post', require('./routers/post.route'))

//cors xatoliklarni oldini olish uchun shunday kod yoziladi
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})
// yoq buncha kod yozmayman desangiz

app.use(cors())

app.listen(3000, () => {
	console.log('Server is runing 3000')
})

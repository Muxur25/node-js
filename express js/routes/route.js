// const { Router } = require('express')

// const router = Router()

// router.get('/forma', (req, res) => { // get sorov yuborayapmiz
// 	res.send(`
// 	<form action='/salom' method='POST'>
// 		<input type='text' name='users'>
// 		<input type='number' name='age'>
// 		<button type='submit'>Send</button>
// 	</form>

// 	`)
// })

// router.post('/salom', (req, res) => { // post sorov yuborayapmiz
// 	res.redirect('/') // hammasi yakunlangandan song bosh sahifaga otvoradi
// 	console.log(req.body) // va consoleda yuborgan sorovimizni koramiz
// })

// module.exports = router







const path = require('path')


const { Router } = require('express')

const router = Router()

router.get('/forma', (req, res) => {
	// get sorov yuborayapmiz
	res.sendFile(path.join(__dirname, '..', './views', 'users.html'))
})

router.post('/salom', (req, res) => {
	// post sorov yuborayapmiz
	res.redirect('/') // hammasi yakunlangandan song bosh sahifaga otvoradi
	console.log(req.body) // va consoleda yuborgan sorovimizni koramiz
	const arr = []
	arr.push(req.body)
})

module.exports = router

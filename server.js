const http = require('http') // http ni ovolamiza

const server = http.createServer((req, res) => {
	// server yaratamiza
	console.log(req)
})

server.listen(3000)



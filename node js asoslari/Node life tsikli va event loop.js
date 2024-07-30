const http = require('http')

const server = http.createServer((req, res) => {
	console.log(req)
	process.exit() // serverga 1 marta sorov yuborib chiqadi
})

server.listen(3000)

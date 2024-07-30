const PORT = 3000

const http = require('http')
const server = http.createServer((req, res) => {
	console.log(req.url) // qaysi url yozsa shu ciqadi
	console.log(req.method) // qaysi methodda
})

console.log('SAlom')
server.listen(4000)

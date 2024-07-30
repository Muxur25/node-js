const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http
	.createServer((req, res) => {
		if (req.url == '/') {
			fs.readFile(
				path.join(__dirname, 'papka', 'qali.txt'),
				'utf8',
				(err, data) => {
					res.end(data)
				}
			)
		} else if (req.url == '/salom') {
			res.end('<h1>Hammaga salom</h1>')
		} else {
			res.end('Page not found')
		}
	})
	.listen(5000)

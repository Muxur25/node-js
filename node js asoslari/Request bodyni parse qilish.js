const http = require('http')
const fs = require('fs')

const server = require('fs')

http
	.createServer((req, res) => {
		if (req.url == '/') {
			res.end(
				`
			<html>
				<title>Post sorov</title>
				<body>
					<form action='/massage' type='POST'>
						<input type="text" name='massage'/>
						<button>Send</button>
					</form>
				</body>
			</html>
			`
			)
		}

		if (req.url === '/massage' && req.method === 'POST') {
			const body = []
			req.on('data', chunk => {
				body.push(chunk)
				console.log(chunk)
			})

			req.on('end', () => {
				const parseJsn = Buffer.concat(body).toString()
				fs.writeFileSync('qalay.txt', parseJsn)
			})

			res.end()
		}
	})
	.listen(3000)

const multipile = require('./Node Module System')

console.log(multipile(5, 6))

const server3 = require('node:url')

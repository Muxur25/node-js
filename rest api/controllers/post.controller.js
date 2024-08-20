const path = require('path')
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database(
	path.resolve(__dirname, '..', 'db', 'posts.db'),
	sqlite3.OPEN_READWRITE,
	err => {
		if (err) {
			console.error('Error opening database:', err.message)
			throw err
		}
	}
)

class PostController {
	getAllPost(req, res) {
		db.all(`SELECT * FROM post`, [], (err, rows) => {
			if (err) {
				console.error('Error fetching posts:', err.message)
				res.status(500).send('Internal Server Error')
				return
			}
			res.status(200).json(rows)
		})
	}

	addNewPost(req, res) {
		const { title, text } = req.body
		db.run(
			`INSERT INTO post(title, post) VALUES (?, ?)`,
			[title, text],
			function (err) {
				if (err) {
					console.error('Error adding post:', err.message)
					res.status(500).send('Internal Server Error')
					return
				}
				res.status(201).send(`Created post with ID: ${this.lastID}`)
			}
		)
	}

	getPostById(req, res) {
		const id = req.params.id
		db.all(`select * from post where id=${id}`, [], (err, rows) => {
			if (err) throw err
			res.status(200).json(rows)
		})
	}

	update(req, res) {
		const id = req.params.id
		const { title, post } = req.body
		db.run(
			`update post set title = ?, post = ? where id = ?`,
			[title, post, id],
			(err, rows) => {
				if (err) throw err
				res.send('data updated')
			}
		)
	}

	delete(req, res) {
		const id = req.params.id
		db.run(`delete from post where id = ?`, [id], err => {
			if (err) throw err
			res.send('Data deleted ' + id)
		})
	}
}

module.exports = new PostController()

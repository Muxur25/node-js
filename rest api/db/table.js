const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(
	path.resolve(__dirname, 'posts.db'),
	sqlite3.OPEN_READWRITE,
	err => {
		if (err) throw err
	}
)

const createPostTable = `
    CREATE TABLE post(
      id INTEGER PRIMARY KEY,
      title VARCHAR(80),
      post VARCHAR(210)
    )
  `

db.run(createPostTable, err => {
	if (err) {
		return console.error('Error creating table:', err.message)
	}
	console.log('Post table created successfully.')
})

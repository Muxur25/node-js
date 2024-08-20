const pool = require('../config/db')

module.exports = class User {
	constructor(username, age) {
		this.username = username
		this.age = age
	}

	save() {
		let users = []
		fs.readFile(pathToFile, 'utf8', (err, data) => {
			if (err) throw err
			users = JSON.parse(data)
			users.push({ uid: this.uid, username: this.username, age: this.age })

			fs.writeFile(pathToFile, JSON.stringify(users), err => {
				if (err) throw err
			})
		})
	}

	static async findAll() {
		const user = await pool.query('SELECT * FROM user_info')
		return user.rows
	}

	static async findByid(id) {
		const user = await pool.query('SELECT * FROM user_info WHERE id = $1', [id])
		return user.rows[0]
	}

	static async addUser(username, age) {
		await pool.query(
			`
      Insert into user_info (username, age) values($1, $2)
      `,
			[username, age]
		)
	}

	static async editPage(id) {
		const user = await pool.query('select * from user_info where id = $1', [id])

		return user.rows[0]
	}

	static async updateUsers(username, age, id) {
		await pool.query(
			'update user_info set username = $1, age = $2 where id = $3',
			[username, age, id]
		)
	}

	static async deleteUser(id) {
		await pool.query('delete from user_info where id = $1', [id])
	}
}

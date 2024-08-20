const Sequelize = require('sequelize')

const sequelize = new Sequelize('diarybook', 'postgres', '1234567', {
	host: 'localhost',
	dialect: 'postgres',
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.diary = require('./diery.model')(sequelize, Sequelize)
db.comment = require('./comment.model')(sequelize, Sequelize)

db.diary.hasMany(db.comment, {
	as: 'comment',
	onDelete: 'CASCADE', // agar diery ocirsak uni comenti ham ochib ketadi
})
db.comment.belongsTo(db.diary, {
	foreignKeys: 'dieryId',
	as: 'diery',
})

module.exports = db

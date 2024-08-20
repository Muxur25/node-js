const Sequelize = require('sequelize')

const sequelize = new Sequelize('probabook', 'postgres', '1234567', {
	host: 'localhost',
	dialect: 'postgres',
})

const db = {}

db.sequelize = sequelize

db.diery = require('./diery.model')(sequelize)

db.comment = require('./comment.model')(sequelize)

db.user = require('./user.model')(sequelize)

db.diery.hasMany(db.comment, {
	as: 'comment',
	onDelete: 'CASCADE',
})

db.user.hasMany(db.diery, {
	as: 'diery',
	onDelete: 'CASCADE',
})

db.user.hasMany(db.comment, {
	as: 'comment',
	onDelete: 'CASCADE',
})

db.diery.belongsTo(db.user, {
	foreignkeys: 'userId',
	as: 'user',
})

db.comment.belongsTo(db.user, {
	foreignkeys: 'userId',
	as: 'user',
})

db.comment.belongsTo(db.diery, {
	foreignkeys: 'dieryId',
	as: 'diery',
})

module.exports = db

const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define(
		'comment',
		{
			// yangi table yaratvommiza
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true, // auto keyingi jadval qoshilib ketadi
				allowNull: false, // bosh qiymatga ega bolmaydi
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			comment: {
				type: DataTypes.STRING(1000),
				allowNull: false,
			},
		},
		{ timestamps: true }
	)

	return Comment
}

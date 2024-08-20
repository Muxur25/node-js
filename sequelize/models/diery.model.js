const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
	const Diery = sequelize.define(
		'diery',
		{
			// yangi table yaratvommiza
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true, // auto keyingi jadval qoshilib ketadi
				allowNull: false, // bosh qiymatga ega bolmaydi
				primaryKey: true,
			},
			text: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING(1000),
				allowNull: true,
			},
		},
		{ timestamps: true }
	)

	return Diery
}

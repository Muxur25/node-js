const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	const Diery = sequelize.define(
		'diery',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			text: {
				type: DataTypes.STRING(1000),
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING(1500),
				allowNull: true,
			},
		},
		{ timestamps: true }
	)

	return Diery
}

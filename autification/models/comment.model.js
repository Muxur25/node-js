const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	const Comment = sequelize.define(
		'comment',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(150),
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

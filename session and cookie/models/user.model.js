const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	const User = sequelize.define(
		'users',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING(60),
				allowNull: false,
				unique: true,
			},
			username: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			isActivated: {
				type: DataTypes.BOOLEAN,
				default: false,
			},
		},
		{ timestamps: true }
	)

	return User
}

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database/mysql/sequelize');
const config = require('../../config');

const DEFAULT_ROLE = 'USER';

const UserModel = sequelize.sequelize.define(
	config.envs.DATABASE.TABLES.USERS,
	{
		id: { type: DataTypes.STRING, primaryKey: true },
		email: { type: DataTypes.STRING, unique: true },
		password: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING },
		surname: { type: DataTypes.STRING },
		address: { type: DataTypes.STRING },
		avatar: { type: DataTypes.STRING },
		birthdate: { type: DataTypes.DATE },
		city: { type: DataTypes.STRING },
		country: { type: DataTypes.STRING },
		dni: { type: DataTypes.STRING },
		gender: { type: DataTypes.STRING },
		isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
		phone: { type: DataTypes.STRING },
		role: { type: DataTypes.STRING, defaultValue: DEFAULT_ROLE },
		token: { type: DataTypes.STRING },
		zipcode: { type: DataTypes.STRING },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	}
);

module.exports = UserModel;

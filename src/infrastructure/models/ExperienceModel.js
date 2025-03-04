const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database/MYSQL/sequelize');
const UserModel = require('./UserModel');
const config = require('../../config');

const USER_RELATION_KEY = 'user_id';

const ExperienceModel = sequelize.sequelize.define(
	config.envs.DATABASE.TABLES.EXPERIENCES,
	{
		id: { type: DataTypes.STRING, primaryKey: true },
		name: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
		price: { type: DataTypes.DOUBLE },
		duration: { type: DataTypes.INTEGER },
		dateTo: { type: DataTypes.DATE },
		dateFrom: { type: DataTypes.DATE },
		location: { type: DataTypes.STRING },
		capacity: { type: DataTypes.INTEGER },
		stock: { type: DataTypes.INTEGER },
		availability: { type: DataTypes.BOOLEAN },
		category: { type: DataTypes.STRING },
		image: { type: DataTypes.STRING },
		user_id: {
			type: DataTypes.STRING,
			references: {
				model: UserModel,
				key: 'id'
			}
		},
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	}
);

// Relación
ExperienceModel.belongsTo(UserModel, { foreignKey: USER_RELATION_KEY });
UserModel.hasMany(ExperienceModel, { foreignKey: USER_RELATION_KEY });

module.exports = ExperienceModel;

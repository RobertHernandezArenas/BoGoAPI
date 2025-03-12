const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database/mysql/sequelize');
const UserModel = require('./UserModel');
const config = require('../../config');
const CategoryModel = require('./CategoryModel');

const USER_RELATION_KEY = 'user_id';
const CATEGORY_RELATION_KEY = 'category_id';

const ExperienceModel = sequelize.define(
	config.envs.DATABASE.TABLES.EXPERIENCES,
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
		category_id: {
			type: DataTypes.INTEGER,
			references: {
				model: config.envs.DATABASE.TABLES.CATEGORIES,
				key: 'id'
			}},
		image: { type: DataTypes.STRING },
		user_id: {
			type: DataTypes.STRING,
			references: {
				model: UserModel,
				key: 'id'
			}
		},
		isFavorite: { type: DataTypes.BOOLEAN },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE }
	}
);

// Relación
ExperienceModel.belongsTo(UserModel, { foreignKey: USER_RELATION_KEY });
UserModel.hasMany(ExperienceModel, { foreignKey: USER_RELATION_KEY });

ExperienceModel.belongsTo(CategoryModel, {
	foreignKey: 'category_id',
	as: 'Category'
});
CategoryModel.hasMany(ExperienceModel, { foreignKey: CATEGORY_RELATION_KEY });


module.exports = ExperienceModel;

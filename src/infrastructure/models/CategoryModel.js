const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database/mysql/sequelize');
const config = require('../../config');
const ExperienceModel = require('./ExperienceModel');

const CategoryModel = sequelize.define(config.envs.DATABASE.TABLES.CATEGORIES, {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	image: { type: DataTypes.STRING },
	createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});


module.exports = CategoryModel;

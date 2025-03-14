const getMySQLConnection = require('../../config/database/mysql');
const CategoryEntity = require('../../domain/entities/CategoryEntity');
const ExperienceModel = require('../models/ExperienceModel');
const CategoryModel = require('../models/CategoryModel');
const { Sequelize } = require('sequelize');

class CategoryRepositoryImpl {
	async create(categoryEntity) {
		const category = await CategoryModels.create(categoryEntity);
		return new CategoryEntity(category);
	}

	async findAll() {
		const categories = await CategoryModels.findAll();
		return categories.map((exp) => new CategoryEntity(exp));
	}

	async getCategoriesAvailablesbyExperience() {
		// const categories = await CategoryModel.findAll();
		const MySQL = getMySQLConnection();
		const categories = await MySQL.query(
			'SELECT * FROM categories WHERE id NOT IN (SELECT category_id FROM experiences)'
		);
		return categories.map((category) => new CategoryEntity(category));
	}

	async findById(id) {
		const category = await CategoryModels.findByPk(id);
		if (!category) return null;
		return new CategoryEntity(category);
	}

	async update(id, categoryEntity) {
		const [updated] = await CategoryModels.update(categoryEntity, {
			where: { id }
		});
		if (!updated) return null;
		const category = await CategoryModels.findByPk(id);
		return new CategoryEntity(category);
	}

	async delete(id) {
		const deleted = await CategoryModels.destroy({ where: { id } });
		return !!deleted;
	}
}

module.exports = CategoryRepositoryImpl;

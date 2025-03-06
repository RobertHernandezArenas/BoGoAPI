const CategoryModels = require('../models/CategoryModel');
const CategoryEntity = require('../../domain/entities/CategoryEntity');

class CategoryRepositoryImpl {
	async create(categoryEntity) {
		const category = await CategoryModels.create(categoryEntity);
		return new CategoryEntity(category);
	}

	async findAll() {
		const categories = await CategoryModels.findAll();
		return categories.map((exp) => new CategoryEntity(exp));
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

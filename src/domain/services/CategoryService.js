const CategoryEntity = require("../entities/CategoryEntity");


class CategoryService {
	constructor(categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	async createCategory(categoryData) {
		const categoryEntity = new CategoryEntity(categoryData);
		return await this.categoryRepository.create(categoryEntity);
	}

	async getAllCategories() {
		return await this.categoryRepository.findAll();
	}

	async getCategoryById(id) {
		return await this.categoryRepository.findById(id);
	}

	async updateCategory(id, categoryData) {
		const categoryEntity = new CategoryEntity(categoryData);
		return await this.categoryRepository.update(id, categoryEntity);
	}

	async deleteCategory(id) {
		return await this.categoryRepository.delete(id);
	}
}

module.exports = CategoryService;

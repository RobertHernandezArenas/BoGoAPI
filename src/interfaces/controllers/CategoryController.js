const CategoryDTO = require('../../domain/dtos/CategoryDTO');
const CategoryService = require('../../domain/services/CategoryService');
const CategoryRepositoryImpl = require('../../infrastructure/repositories/CategoryRepositoryImpl');

const categoryRepository = new CategoryRepositoryImpl();
const categoryService = new CategoryService(categoryRepository);

class CategoryController {
	async create(req, res) {
		try {
			const categoriesDTO = new CategoryDTO(req.body);
			const categories =
				await categoryService.createCategories(categoriesDTO);
			res.status(201).json(categories);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const categories = await categoryService.getAllCategories();
			const categoriesDTOs = categories.map(
				(categories) => new CategoryDTO(categories)
			);
			res.status(200).json({
				error: false,
				data: categoriesDTOs
			});
		} catch (error) {
			res.status(500).json({
				error: error.message,
				data: false
			});
		}
	}

	async getById(req, res) {
		try {
			const categories = await categoryService.getCategoryById(
				req.params.id
			);
			if (!categories)
				return res.status(404).json({ error: 'categories not found' });
			const categoriesDTO = new CategoryDTO(categories);
			res.status(200).json(categoriesDTO);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const categoriesDTO = new CategoryDTO(req.body);
			const categories = await categoryService.updateCategory(
				req.params.id,
				categoriesDTO
			);
			res.status(200).json(categories);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			await categoryService.deleteCategory(req.params.id);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new CategoryController();

const CategoryDTO = require('../../domain/dtos/CategoryDTO');
const CategoryService = require('../../domain/services/CategoryService');
const CategoryRepositoryImpl = require('../../infrastructure/repositories/CategoryRepositoryImpl');

const categoryRepository = new CategoryRepositoryImpl();
const categoryService = new CategoryService(categoryRepository);

class CategoryController {
	async create(req, res) {
		try {
			const experienceDTO = new CategoryDTO(req.body);
			const experience =
				await categoryService.createExperience(experienceDTO);
			res.status(201).json(experience);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const experiences = await categoryService.getAllExperiences();
			const experienceDTOs = experiences.map(
				(experience) => new CategoryDTO(experience)
			);
			res.status(200).json({
				error: false,
				data: experienceDTOs
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
			const experience = await categoryService.getExperienceById(
				req.params.id
			);
			if (!experience)
				return res.status(404).json({ error: 'Experience not found' });
			const experienceDTO = new CategoryDTO(experience);
			res.status(200).json(experienceDTO);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const experienceDTO = new CategoryDTO(req.body);
			const experience = await categoryService.updateExperience(
				req.params.id,
				experienceDTO
			);
			res.status(200).json(experience);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			await categoryService.deleteExperience(req.params.id);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new CategoryController();

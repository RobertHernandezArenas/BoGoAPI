const ExperienceDTO = require('../../domain/dtos/ExperienceDTO');
const ExperienceService = require('../../domain/services/ExperienceService');
const CategoryModel = require('../../infrastructure/models/CategoryModel');
const ExperienceRepositoryImpl = require('../../infrastructure/repositories/ExperienceRepositoryImpl');
const Sequelize = require('sequelize');

const experienceRepository = new ExperienceRepositoryImpl();
const experienceService = new ExperienceService(experienceRepository);

class ExperienceController {
	async create(req, res, next) {
		try {
			const experienceDTO = new ExperienceDTO(req.body);
			const experience =
				await experienceService.createExperience(experienceDTO);
			res.status(201).json({
				error: false,
				data: experience
			});
		} catch (error) {
			next(error);
		}
	}

	async getAll(req, res) {
		try {
			const experiences = await experienceService.getAllExperiences();
			
			const experienceDTOs = experiences.map(
				(experience) => new ExperienceDTO(experience)
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
			const experience = await experienceService.getExperienceById(
				req.params.id
			);

			console.log(experience, req);
			if (!experience)
				return res
					.status(404)
					.json({ error: 'Experience not found', data: false });
			const experienceDTO = new ExperienceDTO(experience);
			res.status(200).json({
				error: false,
				data: experienceDTO
			});
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		}
	}

	async update(req, res) {
		try {
			const experienceDTO = new ExperienceDTO(req.body);
			const experience = await experienceService.updateExperience(
				req.params.id,
				experienceDTO
			);
			res.status(200).json({
				error: false,
				data: experience
			});
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		}
	}

	async delete(req, res) {
		try {
			await experienceService.deleteExperience(req.params.id);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		}
	}
}

module.exports = new ExperienceController();

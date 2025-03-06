const ExperienceDTO = require('../../domain/dtos/ExperienceDTO');
const ExperienceService = require('../../domain/services/ExperienceService');
const ExperienceRepositorySequelize = require('../../infrastructure/repositories/ExperienceRepositorySequelize');

const experienceRepository = new ExperienceRepositorySequelize();
const experienceService = new ExperienceService(experienceRepository);

class ExperienceController {
	async create(req, res) {
		try {
			const experienceDTO = new ExperienceDTO(req.body);
			const experience =
				await experienceService.createExperience(experienceDTO);
			res.status(201).json(experience);
		} catch (error) {
			res.status(500).json({ error: error.message });
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
			if (!experience)
				return res.status(404).json({ error: 'Experience not found' });
			const experienceDTO = new ExperienceDTO(experience);
			res.status(200).json(experienceDTO);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const experienceDTO = new ExperienceDTO(req.body);
			const experience = await experienceService.updateExperience(
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
			await experienceService.deleteExperience(req.params.id);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new ExperienceController();

const ExperienceModels = require('../models/ExperienceModel');
const ExperienceEntity = require('../../domain/entities/ExperienceEntity');

class ExperienceRepositorySequelize {
	async create(experienceEntity) {
		const experience = await ExperienceModels.create(experienceEntity);
		return new ExperienceEntity(experience);
	}

	async findAll() {
		const experiences = await ExperienceModels.findAll();
		return experiences.map((exp) => new ExperienceEntity(exp));
	}

	async findById(id) {
		const experience = await ExperienceModels.findByPk(id);
		if (!experience) return null;
		return new ExperienceEntity(experience);
	}

	async update(id, experienceEntity) {
		const [updated] = await ExperienceModels.update(experienceEntity, {
			where: { id }
		});
		if (!updated) return null;
		const experience = await ExperienceModels.findByPk(id);
		return new ExperienceEntity(experience);
	}

	async delete(id) {
		const deleted = await ExperienceModels.destroy({ where: { id } });
		return !!deleted;
	}
}

module.exports = ExperienceRepositorySequelize;

class ExperienceService {
	constructor(experienceRepository) {
		this.experienceRepository = experienceRepository;
	}

	async createExperience(experienceData) {
		const experienceEntity = new ExperienceEntity(experienceData);
		return await this.experienceRepository.create(experienceEntity);
	}

	async getAllExperiences() {
		return await this.experienceRepository.findAll();
	}

	async getExperienceById(id) {
		return await this.experienceRepository.findById(id);
	}

	async updateExperience(id, experienceData) {
		const experienceEntity = new ExperienceEntity(experienceData);
		return await this.experienceRepository.update(id, experienceEntity);
	}

	async deleteExperience(id) {
		return await this.experienceRepository.delete(id);
	}
}

module.exports = ExperienceService;

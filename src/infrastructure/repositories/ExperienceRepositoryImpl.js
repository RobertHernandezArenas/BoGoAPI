const ExperienceModel = require('../models/ExperienceModel');
const ExperienceEntity = require('../../domain/entities/ExperienceEntity');
const CategoryModel = require('../models/CategoryModel');
const CategoryEntity = require('../../domain/entities/CategoryEntity');
const { Sequelize } = require('sequelize');

class ExperienceRepositoryImpl {
	async create(experienceEntity) {
		const experience = await ExperienceModel.create(experienceEntity);
		return new ExperienceEntity(experience);
	}

	async findAll() {
		const experiences =
			await ExperienceModel.findAll(/*{
			attributes: [
				'id',
				'name',
				'description',
				'price',
				'duration',
				'dateTo',
				'dateFrom',
				'location',
				'capacity',
				'stock',
				'availability',
				'image',
				'user_id',
				'isFavorite',
				'createdAt',
				'updatedAt',
				[Sequelize.literal('`Category`.`name`'), 'category_name'], // Alias para nombre de categoría
				[Sequelize.literal('`Category`.`image`'), 'category_image'] // Alias para imagen de categoría
			],
			include: [
				{
					model: CategoryModel,
					as: 'Category', // El alias debe coincidir con el definido en la relación
					attributes: [] // Excluir atributos redundantes de Category
				}
			]
		}*/);
		return experiences.map((exp) => new ExperienceEntity(exp));
	}

	async findById(id) {
		const experience = await ExperienceModel.findByPk(id);
		if (!experience) return null;
		return new ExperienceEntity(experience);
	}

	async update(id, experienceEntity) {
		const [updated] = await ExperienceModel.update(experienceEntity, {
			where: { id }
		});
		if (!updated) return null;
		const experience = await ExperienceModel.findByPk(id);
		return new ExperienceEntity(experience);
	}

	async delete(id) {
		const deleted = await ExperienceModel.destroy({ where: { id } });
		return !!deleted;
	}
}

module.exports = ExperienceRepositoryImpl;

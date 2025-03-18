import { ExperienceDTO } from '../../domain/dtos/ExperienceDTO.js';
import { getMySQLConnection } from '../../config/database/mysql/index.js';
import { CONSTANTS } from '../../config/envs.js';

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
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const [experiences] = await dbConnection.query(`
				SELECT
					exp.*,
					cat.name AS category_name,
					cat.image AS category_image
				FROM experience exp
				INNER JOIN category cat
				ON exp.category_id = cat.id;
				`);

			res.status(200).json({
				error: false,
				data: experiences
			});
		} catch (error) {
			res.status(500).json({
				error: error.message,
				data: false
			});
		} finally {
			dbConnection.close();
		}
	}

	async getById(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { id } = req.query;
			const [experience] = await dbConnection.query(`
				SELECT
					exp.*,
					cat.name AS category_name,
					cat.image AS category_image
				FROM experience exp
				INNER JOIN category cat
				ON exp.category_id = cat.id
				WHERE exp.id=${id}
				;`);

			res.status(200).json({
				error: false,
				data: experience
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

export const experienceController = new ExperienceController();

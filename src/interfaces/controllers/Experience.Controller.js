import { ExperienceDTO } from '../../domain/dtos/ExperienceDTO.js';
import { getMySQLConnection } from '../../config/database/mysql/index.js';
import { CONSTANTS } from '../../config/envs.js';

class ExperienceController {
	async create(req, res, next) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const {
				name,
				description,
				price,
				duration,
				dateTo,
				dateFrom,
				location,
				capacity,
				stock,
				availability,
				category_id,
				image
			} = req.body;

			const [_id] = await dbConnection.query(
				`
				SELECT
					*
				FROM ${CONSTANTS.DATABASE.TABLES.EXPERIENCE};`
			);

			dbConnection.query(
				`INSERT INTO experience(
					id,
					name,
					description,
					price,
					duration,
					dateTo,
					dateFrom,
					location,
					capacity,
					stock,
					availability,
					user_id,
					category_id,
					image
				)
				VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);
				`,
				[
					_id.length + 1,
					name,
					description,
					price,
					duration,
					new Date(dateTo),
					new Date(dateFrom),
					location,
					capacity,
					stock,
					availability,
					1,
					category_id,
					image
				]
			);

			console.log(_id.length + 1);
			res.status(201).json({
				error: false,
				data: { message: 'Experience was created' }
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
			const [experience] = await dbConnection.query(
				`
 				SELECT
 					exp.*,
 					cat.name AS category_name,
 					cat.image AS category_image
 				FROM ${CONSTANTS.DATABASE.TABLES.EXPERIENCE} exp
 				INNER JOIN ${CONSTANTS.DATABASE.TABLES.CATEGORY} cat
				ON exp.category_id = cat.id
				WHERE exp.id=?
 				;`,
				[id]
			);

			const [reviews] = await dbConnection.query(
				`SELECT * FROM review WHERE experience_id=?;`,
				[id]
			);

			experience[0].reviews = reviews;

			res.status(200).json({
				error: false,
				data: experience
			});
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		}
	}
	async getAllByCategoryId(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { category_id } = req.query;
			const [experience] = await dbConnection.query(
				`
				SELECT *
				FROM experience exp
				WHERE exp.category_id = ?;`,
				[category_id]
			);

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

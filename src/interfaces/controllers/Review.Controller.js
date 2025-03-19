import { CONSTANTS } from '../../config/envs.js';
import { getMySQLConnection } from '../../config/database/mysql/index.js';

export class ReviewController {
	async create(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { rating, comment, user_id } = req.body;
			const { experience_id } = req.query;
			await dbConnection.query(
				`
			INSERT INTO ${CONSTANTS.DATABASE.TABLES.REVIEW}(
				rating,
				comment,
				user_id,
				experience_id
				)
			VALUES(?, ?, ?, ?)
			;`,
				[rating, comment, user_id, experience_id]
			);
			res.status(201).json({
				error: false,
				data: { message: 'Review was created' }
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		} finally {
			dbConnection.release();
		}
	}

	async getAll(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const [categories] = await dbConnection.query(`
				SELECT * FROM ${CONSTANTS.DATABASE.TABLES.REVIEW};`);

			res.status(200).json({
				error: false,
				data: categories
			});
		} catch (error) {
			res.status(500).json({
				error: error.message,
				data: false
			});
		} finally {
			dbConnection.release();
		}
	}

	async getById(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { id } = req.query;

			const [category] = await dbConnection.query(
				`SELECT * FROM ${CONSTANTS.DATABASE.TABLES.REVIEW} WHERE id = ?;`,
				[id]
			);

			if (category.length > 0) {
				res.status(200).json({
					error: false,
					data: category
				});
				return;
			}

			res.status(404).json({
				error: { message: 'Category not found' },
				data: false
			});
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		} finally {
			dbConnection.release();
		}
	}

	async update(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { name, image } = req.body;
			const { id } = req.query;
			const category = await dbConnection.query(
				`
				UPDATE ${CONSTANTS.DATABASE.TABLES.REVIEW}
				SET name = ?, image = ?
				WHERE id = ?
				;`,
				[name, image, id]
			);
			res.status(200).json({
				error: false,
				data: { message: 'Category was updated' }
			});
		} catch (error) {
			res.status(500).json({ error: error.message, data: false });
		} finally {
			dbConnection.release();
		}
	}

	async delete(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { id } = req.params;
			await dbConnection.query(
				`
				DELETE FROM ${CONSTANTS.DATABASE.TABLES.REVIEW}
				WHERE id = ?
				;`,
				[id]
			);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: error.message });
		} finally {
			dbConnection.release();
		}
	}
}

export const reviewController = new ReviewController();

import { CategoryDTO } from '../../domain/dtos/CategoryDTO.js';
import { CONSTANTS } from '../../config/envs.js';
import { getMySQLConnection } from '../../config/database/mysql/index.js';

export class CategoryController {
	async create(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);

		/* await dbConnection.query(`
			INSERT INTO user(
				email,
				name,
				surname,
				avatar,
				birthdate,
				city,
				country,
				phone,
				)
			VALUES(?,?,?,?,?,?,?,?)
			`);
		*/

		try {
			const { name, image } = req.body;
			await dbConnection.query(
				`
			INSERT INTO ${CONSTANTS.DATABASE.TABLES.CATEGORY}(
				name,
				image
				)
			VALUES(?, ?)
			;`,
				[name, image]
			);
			res.status(201).json({
				error: false,
				data: { message: 'Category was created' }
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
				SELECT * FROM ${CONSTANTS.DATABASE.TABLES.CATEGORY};`);

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
	async getAvailableCategoriesByExperience(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const [categories] = await dbConnection.query(`
				SELECT DISTINCT
					cat.id AS category_id,
    				cat.name AS category_name,
    				cat.image AS category_image
				FROM experience exp
				INNER JOIN category cat
				ON exp.category_id = cat.id
				;`);

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
			console.log({ id });
			const [category] = await dbConnection.query(
				`SELECT * FROM ${CONSTANTS.DATABASE.TABLES.CATEGORY} WHERE id = ?;`,
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
				UPDATE ${CONSTANTS.DATABASE.TABLES.CATEGORY}
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
				DELETE FROM ${CONSTANTS.DATABASE.TABLES.CATEGORY}
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

export const categoryController = new CategoryController();

import { getMySQLConnection } from '../../config/database/mysql/index.js';
import { CONSTANTS } from '../../config/envs.js';
import { encrypt } from './../../utils/plugins/bcrypt.js';

class UserController {
	async create(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const {
				email,
				password,
				name,
				surname,
				avatar,
				birthdate,
				city,
				country,
				phone
			} = req.body;
			await dbConnection.query(
				`
				INSERT INTO user(
					email,
					password,
					name,
					surname,
					avatar,
					birthdate,
					city,
					country,
					phone)
				VALUES(?,?,?,?,?,?,?,?,?);
				`,
				[
					email,
					encrypt(password, 10),
					name,
					surname,
					avatar,
					new Date(birthdate),
					city,
					country,
					phone
				]
			);
			res.status(201).json();
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
			const [users] = await dbConnection.query(
				`SELECT * FROM ${CONSTANTS.DATABASE.TABLES.USER}`
			);
			res.status(200).json({ error: false, data: users });
		} catch (error) {
			res.status(500).json({ error: error.message });
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
			const [user] = await dbConnection.query(
				`SELECT * FROM ${CONSTANTS.DATABASE.TABLES.USER} WHERE id = ?`,
				[id]
			);
			res.status(200).json({
				error: false,
				data: user
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		} finally {
			dbConnection.release();
		}
	}

	async update(req, res) {
		try {
			
			res.status(200).json({
				error: false,
				data: {message: 'falta implementar'}
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		} finally {
			dbConnection.release();
		}
	}

	async delete(req, res) {
		try {
			res.status(204).json({
				error: false,
				data: { message: 'falta implementar' }
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		} finally {
			dbConnection.release();
		}
	}
}

export const userController = new UserController();

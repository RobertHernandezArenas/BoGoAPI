import mysql from 'mysql2/promise';
import { CONSTANTS } from '../../envs.js';

let pool;

// Get connection from pool
export async function getMySQLConnection(dbName) {
	if (!pool) {
		pool = mysql.createPool({
			connectionLimit: CONSTANTS.DATABASE.MYSQL.POOL_MAX,
			host: CONSTANTS.DATABASE.MYSQL.HOST,
			user: CONSTANTS.DATABASE.MYSQL.USERNAME,
			password: CONSTANTS.DATABASE.MYSQL.PASSWORD,
			database: dbName
		});
	}

	return await pool.getConnection();
}

const mysql = require('mysql2/promise');
const config = require('../../index');

let pool;

async function getMySQLConnection() {
	if (!pool) {
		pool = mysql.createPool({
			host: config.envs.DATABASE.MYSQL.HOST,
			port: config.envs.DATABASE.MYSQL.PORT,
			user: config.envs.DATABASE.MYSQL.USERNAME,
			password: config.envs.DATABASE.MYSQL.PASSWORD,
			database: config.envs.DATABASE.MYSQL.DB_NAME
		});
	}
	return await pool.getConnection();
}

module.exports = getMySQLConnection;

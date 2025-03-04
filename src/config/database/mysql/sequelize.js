const config = require('../../index');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	config.envs.DATABASE.MYSQL.DB_NAME,
	config.envs.DATABASE.MYSQL.USERNAME,
	config.envs.DATABASE.MYSQL.PASSWORD,
	{
		host: config.envs.DATABASE.MYSQL.HOST,
		port: config.envs.DATABASE.MYSQL.PORT,
		dialect: config.envs.DATABASE.MYSQL.DIALECT,
		define: {
			timestamps: config.envs.DATABASE.MYSQL.TIMESTAMPS
		},
		pool: {
			max: config.envs.DATABASE.MYSQL.POOL_MAX,
			min: config.envs.DATABASE.MYSQL.POOL_MIN,
			acquire: config.envs.DATABASE.MYSQL.ACQUIRE,
			idle: config.envs.DATABASE.MYSQL.IDLE
		}
	}
);

module.exports = { sequelize };

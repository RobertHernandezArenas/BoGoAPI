// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('../loadData');

// IMPORTS
const sequelize = require('./config/database/mysql/sequelize');
const config = require('./config');
const AppRouter = require('./interfaces/routes');
const { buildLogger } = require('./utils/logger');

const app = express();
const PORT = config.envs.PORT || 3000;
const logger = buildLogger('[File Path]: src/app');

app
	.use(morgan('dev'))
	.use(
		cors({
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
			headers: ['Content-Type', 'Authorization'],
			credentials: true
		})
	)
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(express.static("public"))
	.use('/', AppRouter)
	.listen(PORT, () => {
		try {
			sequelize.sync();
			loadData();
			logger.log('Connection has been established successfully.');
			logger.log('Server is running at http://localhost:' + PORT);
		} catch (error) {
			console.error('Unable to connect to the database:', error.message);
		}
	});

module.exports = app;
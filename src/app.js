// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// IMPORTS
const sequelize = require('./config/database/mysql/sequelize');
const config = require('./config');
const AppRouter = require('./interfaces/routes');

const app = express();
const PORT = config.envs.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

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
	.use(express.static(publicFolder))
	.use('/', AppRouter)
	.listen(PORT, () => {
		try {
			sequelize.sync();
			console.log('Connection has been established successfully.');
			console.log('Server is running at http://localhost:' + PORT);
		} catch (error) {
			console.error('Unable to connect to the database:', error.message);
		}
	});

module.exports = app;

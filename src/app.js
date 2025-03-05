// DEPENDENCIES
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// IMPORTS
const swaggerDOC = require('./interfaces/docs/swagger');
const userRoutes = require('./interfaces/routes/UserRoutes');
const experienceRoutes = require('./interfaces/routes/ExperienceRoutes');
const errorHandler = require('./interfaces/middlewares/errorHandler');
const { sequelize } = require('./config/database/MYSQL/sequelize');
const fillDB = require('./config/database/mysql/dbScript');
const config = require('./config');

const app = express();
const PORT = config.envs.PORT;
const DATABASE_NAME = config.envs.DATABASE_NAME;
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
	.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDOC))
	.use('/api/v1', userRoutes)
	.use('/api/v1', experienceRoutes)
	.use(errorHandler)
	.listen(PORT, () => {
		try {
			sequelize.sync();
			fillDB();
			console.log('Connection has been established successfully.');
			console.log('Server is running at http://localhost:' + PORT);
		} catch (error) {
			console.error(
				'Unable to connect to the database:',
				error.message,
				DATABASE_NAME
			);
		}
	});

module.exports = app;

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
const sequelize = require('./config/database/mysql/sequelize');
const fillDB = require('./config/database/mysql/dbScript');
const config = require('./config');
const categoryRoutes = require('./interfaces/routes/CategoryRoutes');

const app = express();
const PORT = config.envs.PORT;
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
	.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDOC))
	.use('/api/v1', userRoutes)
	.use('/api/v1', experienceRoutes)
	.use('/api/v1', categoryRoutes)
	.use(errorHandler)
	.listen(PORT, () => {
		try {
			sequelize.sync();
			fillDB();
			console.log('Connection has been established successfully.');
			console.log('Server is running at http://localhost:' + PORT);
		} catch (error) {
			console.error('Unable to connect to the database:', error.message);
		}
	});

module.exports = app;

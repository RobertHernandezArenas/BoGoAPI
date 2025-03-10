const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerDOC = require('../docs/swagger');
const CategoryRoutes = require('./CategoryRoutes');
const ExperienceRoutes = require('./ExperienceRoutes');
const UserRoutes = require('./UserRoutes');

const AppRouter = express.Router();

AppRouter

	/* 	.use('/', (request, response) => {
	response.status(200).send({
		error: false,
		data: { message: 'Welcome to Book&Go API, go to: /v1/documentation' }
	});
}) */

	.use('/v1/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDOC))

	.use('/v1/categories', CategoryRoutes)

	.use('/v1/experiences', ExperienceRoutes)

	.use('/v1/users', UserRoutes)

	.use('*', (request, response) => {
		response.status(404).json({
			error: {
				code: 404,
				message: 'Page not found'
			},
			data: false
		});
	})

	.use((error, request, response, next) => {
		logger.error(`[Server Error]: ${error.message}`);
		response.status(500).json({
			error: 'Internal Server Error',
			details: 'Something went wrong on the server'
		});
	});

module.exports = AppRouter;

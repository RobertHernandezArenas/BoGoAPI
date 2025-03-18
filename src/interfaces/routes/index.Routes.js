// DEPENDENCIES
import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

// IMPORTS
import { CategoryRoutes } from './Category.Routes.js';
import { ExperienceRoutes } from './Experience.Routes.js';
import { PaymentRoutes } from './Payments.Routes.js';
import { swaggerDOC } from '../docs/swagger.js';

export const AppRouter = Router();

AppRouter.use('/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDOC));

AppRouter.use('/v1/payments', PaymentRoutes);

AppRouter.use('/v1/category', CategoryRoutes);

AppRouter.use('/v1/experience', ExperienceRoutes);

AppRouter.use('*', (request, response) => {
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

import swaggerJsDoc from 'swagger-jsdoc';
import { AppConfig } from '../../config/index.js';

const swaggerDefinitions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'BookAndGo API',
			version: '1.0.0',
			description: 'API para gestionar usuarios y experiencias',
			contact: {
				name: 'Robert Hernández Arenas',
				email: 'roberthernandezarenas@gmail.com'
			},
			license: {
				name: 'Apache 2.0',
				url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
			}
		},
		servers: [
			{
				url: `http://localhost:${AppConfig.CONSTANTS.PORT}`,
				description: 'Local Server'
			},
			{
				url: `https://${AppConfig.CONSTANTS.SERVER}`,
				description: 'API Everywhere Server'
			}
		]
	},
	apis: ['./src/interfaces/routes/*.js']
};

export const swaggerDOC = swaggerJsDoc(swaggerDefinitions);

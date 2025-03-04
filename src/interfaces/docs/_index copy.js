const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinitions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Book And Go API',
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
		host: 'localhost:8000',
		basePath: 'http://localhost:8000/api/v1',
		servers: [
			{
				url: 'http://localhost:8000',
				description: 'Local Server'
			},
			{
				url: 'https://apieverywhere.bookandgo.com',
				description: 'API Everywhere Server'
			}
		],/*
		components: {
			securitySchemes: {
				BearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			},
			schemas: {
				User: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						email: { type: 'string' },
						password: { type: 'string' },
						name: { type: 'string' },
						surname: { type: 'string' },
						address: { type: 'string' },
						avatar: { type: 'string' },
						birthdate: { type: 'string', format: 'date-time' },
						city: { type: 'string' },
						country: { type: 'string' },
						dni: { type: 'string' },
						gender: { type: 'string' },
						isActive: { type: 'boolean' },
						phone: { type: 'string' },
						role: { type: 'string' },
						token: { type: 'string' },
						zipcode: { type: 'string' },
						createdAt: { type: 'string', format: 'date-time' },
						updatedAt: { type: 'string', format: 'date-time' }
					}
				},
				Experience: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						name: { type: 'string' },
						description: { type: 'string' },
						price: { type: 'number', format: 'double' },
						duration: { type: 'integer' },
						dateTo: { type: 'string', format: 'date-time' },
						dateFrom: { type: 'string', format: 'date-time' },
						location: { type: 'string' },
						capacity: { type: 'integer' },
						stock: { type: 'integer' },
						availability: { type: 'boolean' },
						category: { type: 'string' },
						image: { type: 'string' },
						user_id: { type: 'string' },
						createdAt: { type: 'string', format: 'date-time' },
						updatedAt: { type: 'string', format: 'date-time' }
					}
				}
			}
		}*/
	},
	apis: ['../routes/*.js']
};

const swaggerDOC = swaggerJsDoc(swaggerDefinitions);

// module.exports = swaggerDOC;

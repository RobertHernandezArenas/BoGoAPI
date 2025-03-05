const swaggerJsDoc = require('swagger-jsdoc');

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
				url: 'http://localhost:8000',
				description: 'Local Server'
			},
			{
				url: 'https://apieverywhere.bookandgo.com',
				description: 'API Everywhere Server'
			}
		],
	},
	apis: ['./specs_.yml']
};

const swaggerDOC = swaggerJsDoc(swaggerDefinitions);

module.exports = swaggerDOC;

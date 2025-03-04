const { buildLogger } = require('../../utils/logger');

const logger = buildLogger(
	'[File Path]: src/interfaces/middlewares/errorHandler'
);

function errorHandler(err, req, res, next) {
	console.error(err.stack); // Log del error en consola
	logger.error(err.stack); // Log del error en archivo

	// Errores de validación con Joi
	if (err.name === 'ValidationError') {
		logger.error(`[Error Joi]: ${err.details || err.message}`); // Log del error en archivo (err.details || err.message);
		return res.status(400).json({
			error: 'Validation Error',
			details: err.details || err.message
		});
	}

	// Errores de Sequelize (base de datos)
	if (
		err.name === 'SequelizeValidationError' ||
		err.name === 'SequelizeUniqueConstraintError'
	) {
		logger.error(`[Error Sequelize]: ${err.errors.map((e) => e.message)}`);
		return res.status(400).json({
			error: 'Database Error',
			details: err.errors.map((e) => e.message)
		});
	}

	// Errores de autenticación
	if (err.name === 'UnauthorizedError') {
		logger.error(`[Error Unauthorized]: ${err.message}`);
		return res.status(401).json({
			error: 'Unauthorized',
			details: 'You are not authorized to access this resource'
		});
	}

	// Errores de rol no permitido
	if (err.name === 'ForbiddenError') {
		logger.error(`[Error Forbidden]: ${err.message}`);
		return res.status(403).json({
			error: 'Forbidden',
			details: 'You do not have permission to perform this action'
		});
	}

	if (res.status(500)) {
		logger.error(`[Server Error]: ${err.message}`);
	}
	// Error genérico (500)
	res.status(500).json({
		error: 'Internal Server Error',
		details: 'Something went wrong on the server'
	});
}

module.exports = errorHandler;

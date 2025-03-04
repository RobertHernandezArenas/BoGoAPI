const Joi = require('joi');

// Esquema de validación para la creación de una experiencia
const experienceSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.empty': 'El nombre es obligatorio',
		'any.required': 'El nombre es obligatorio'
	}),
	description: Joi.string().required().messages({
		'string.empty': 'La descripción es obligatoria',
		'any.required': 'La descripción es obligatoria'
	}),
	price: Joi.number().positive().required().messages({
		'number.base': 'El precio debe ser un número',
		'number.positive': 'El precio debe ser un número positivo',
		'any.required': 'El precio es obligatorio'
	}),
	duration: Joi.number().integer().positive().required().messages({
		'number.base': 'La duración debe ser un número',
		'number.integer': 'La duración debe ser un número entero',
		'number.positive': 'La duración debe ser un número positivo',
		'any.required': 'La duración es obligatoria'
	}),
	dateTo: Joi.date().required().messages({
		'date.base': 'La fecha de fin debe ser una fecha válida',
		'any.required': 'La fecha de fin es obligatoria'
	}),
	dateFrom: Joi.date().required().messages({
		'date.base': 'La fecha de inicio debe ser una fecha válida',
		'any.required': 'La fecha de inicio es obligatoria'
	}),
	location: Joi.string().required().messages({
		'string.empty': 'La ubicación es obligatoria',
		'any.required': 'La ubicación es obligatoria'
	}),
	capacity: Joi.number().integer().positive().required().messages({
		'number.base': 'La capacidad debe ser un número',
		'number.integer': 'La capacidad debe ser un número entero',
		'number.positive': 'La capacidad debe ser un número positivo',
		'any.required': 'La capacidad es obligatoria'
	}),
	stock: Joi.number().integer().min(0).required().messages({
		'number.base': 'El stock debe ser un número',
		'number.integer': 'El stock debe ser un número entero',
		'number.min': 'El stock no puede ser negativo',
		'any.required': 'El stock es obligatorio'
	}),
	availability: Joi.boolean().required().messages({
		'boolean.base': 'La disponibilidad debe ser un valor booleano',
		'any.required': 'La disponibilidad es obligatoria'
	}),
	category: Joi.string().required().messages({
		'string.empty': 'La categoría es obligatoria',
		'any.required': 'La categoría es obligatoria'
	}),
	image: Joi.string().optional().messages({
		'string.base': 'La imagen debe ser una cadena de texto'
	}),
	user_id: Joi.string().required().messages({
		'string.empty': 'El ID del usuario es obligatorio',
		'any.required': 'El ID del usuario es obligatorio'
	})
});

// Esquema de validación para la actualización de una experiencia
const updateExperienceSchema = Joi.object({
	name: Joi.string().optional().messages({
		'string.empty': 'El nombre no puede estar vacío'
	}),
	description: Joi.string().optional().messages({
		'string.empty': 'La descripción no puede estar vacía'
	}),
	price: Joi.number().positive().optional().messages({
		'number.base': 'El precio debe ser un número',
		'number.positive': 'El precio debe ser un número positivo'
	}),
	duration: Joi.number().integer().positive().optional().messages({
		'number.base': 'La duración debe ser un número',
		'number.integer': 'La duración debe ser un número entero',
		'number.positive': 'La duración debe ser un número positivo'
	}),
	dateTo: Joi.date().optional().messages({
		'date.base': 'La fecha de fin debe ser una fecha válida'
	}),
	dateFrom: Joi.date().optional().messages({
		'date.base': 'La fecha de inicio debe ser una fecha válida'
	}),
	location: Joi.string().optional().messages({
		'string.empty': 'La ubicación no puede estar vacía'
	}),
	capacity: Joi.number().integer().positive().optional().messages({
		'number.base': 'La capacidad debe ser un número',
		'number.integer': 'La capacidad debe ser un número entero',
		'number.positive': 'La capacidad debe ser un número positivo'
	}),
	stock: Joi.number().integer().min(0).optional().messages({
		'number.base': 'El stock debe ser un número',
		'number.integer': 'El stock debe ser un número entero',
		'number.min': 'El stock no puede ser negativo'
	}),
	availability: Joi.boolean().optional().messages({
		'boolean.base': 'La disponibilidad debe ser un valor booleano'
	}),
	category: Joi.string().optional().messages({
		'string.empty': 'La categoría no puede estar vacía'
	}),
	image: Joi.string().optional().messages({
		'string.base': 'La imagen debe ser una cadena de texto'
	}),
	user_id: Joi.string().optional().messages({
		'string.empty': 'El ID del usuario no puede estar vacío'
	})
});

// Middleware para validar la creación de una experiencia
const validateExperience = (req, res, next) => {
	const { error } = experienceSchema.validateAsync(req.body, {
		abortEarly: false
	});
	if (error) {
		return res.status(400).json({
			errors: error.details.map((err) => ({
				field: err.context.key,
				message: err.message
			}))
		});
	}
	next();
};

// Middleware para validar la actualización de una experiencia
const validateUpdateExperience = (req, res, next) => {
	const { error } = updateExperienceSchema.validateAsync(req.body, {
		abortEarly: false
	});
	if (error) {
		return res.status(400).json({
			errors: error.details.map((err) => ({
				field: err.context.key,
				message: err.message
			}))
		});
	}
	next();
};

module.exports = {
	experienceSchema,
	updateExperienceSchema,
	validateExperience,
	validateUpdateExperience
};

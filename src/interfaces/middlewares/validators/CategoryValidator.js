const Joi = require('joi');

// Esquema de validación para la creación de una categoria
const categorySchema = Joi.object({
	name: Joi.string().required().messages({
		'string.empty': 'El nombre es obligatorio',
		'any.required': 'El nombre es obligatorio'
	}),
	image: Joi.string().optional().messages({
		'string.base': 'La imagen debe ser una cadena de texto'
	}),
});

// Esquema de validación para la actualización de una categoria
const updateCategorySchema = Joi.object({
	name: Joi.string().optional().messages({
		'string.empty': 'El nombre no puede estar vacío',
		'any.required': 'El nombre es obligatorio'
	}),
	image: Joi.string().optional().messages({
		'string.base': 'La imagen debe ser una cadena de texto'
	})
});

// Middleware para validar la creación de una categoria
const validateCategory = (req, res, next) => {
	const { error } = categorySchema.validateAsync(req.body, {
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

// Middleware para validar la actualización de una categoria
const validateUpdateCategory = (req, res, next) => {
	const { error } = updateCategorySchema.validateAsync(req.body, {
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
	categorySchema,
	updateCategorySchema,
	validateCategory,
	validateUpdateCategory
};

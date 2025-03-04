const Joi = require('joi');

// Esquema de validación para la creación de un usuario
const userSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.empty': 'El correo electrónico es obligatorio',
		'string.email': 'El correo electrónico debe ser válido',
		'any.required': 'El correo electrónico es obligatorio'
	}),
	password: Joi.string().min(6).required().messages({
		'string.empty': 'La contraseña es obligatoria',
		'string.min': 'La contraseña debe tener al menos 6 caracteres',
		'any.required': 'La contraseña es obligatoria'
	}),
	name: Joi.string().required().messages({
		'string.empty': 'El nombre es obligatorio',
		'any.required': 'El nombre es obligatorio'
	}),
	surname: Joi.string().required().messages({
		'string.empty': 'El apellido es obligatorio',
		'any.required': 'El apellido es obligatorio'
	}),
	address: Joi.string().required().messages({
		'string.empty': 'La dirección es obligatoria',
		'any.required': 'La dirección es obligatoria'
	}),
	avatar: Joi.string().optional().messages({
		'string.base': 'El avatar debe ser una cadena de texto'
	}),
	birthdate: Joi.date().required().messages({
		'date.base': 'La fecha de nacimiento debe ser una fecha válida',
		'any.required': 'La fecha de nacimiento es obligatoria'
	}),
	city: Joi.string().required().messages({
		'string.empty': 'La ciudad es obligatoria',
		'any.required': 'La ciudad es obligatoria'
	}),
	country: Joi.string().required().messages({
		'string.empty': 'El país es obligatorio',
		'any.required': 'El país es obligatorio'
	}),
	dni: Joi.string().required().messages({
		'string.empty': 'El DNI es obligatorio',
		'any.required': 'El DNI es obligatorio'
	}),
	gender: Joi.string().valid('male', 'female', 'other').required().messages({
		'string.empty': 'El género es obligatorio',
		'any.only': 'El género debe ser male, female u other',
		'any.required': 'El género es obligatorio'
	}),
	isActive: Joi.boolean().default(true).messages({
		'boolean.base': 'El estado activo debe ser un valor booleano'
	}),
	phone: Joi.string().required().messages({
		'string.empty': 'El teléfono es obligatorio',
		'any.required': 'El teléfono es obligatorio'
	}),
	role: Joi.string().valid('USER', 'ADMIN').default('USER').messages({
		'string.empty': 'El rol no puede estar vacío',
		'any.only': 'El rol debe ser USER o ADMIN'
	}),
	token: Joi.string().optional().messages({
		'string.base': 'El token debe ser una cadena de texto'
	}),
	zipcode: Joi.string().required().messages({
		'string.empty': 'El código postal es obligatorio',
		'any.required': 'El código postal es obligatorio'
	})
});

// Esquema de validación para la actualización de un usuario
const updateUserSchema = Joi.object({
	email: Joi.string().email().optional().messages({
		'string.email': 'El correo electrónico debe ser válido'
	}),
	password: Joi.string().min(6).optional().messages({
		'string.min': 'La contraseña debe tener al menos 6 caracteres'
	}),
	name: Joi.string().optional().messages({
		'string.empty': 'El nombre no puede estar vacío'
	}),
	surname: Joi.string().optional().messages({
		'string.empty': 'El apellido no puede estar vacío'
	}),
	address: Joi.string().optional().messages({
		'string.empty': 'La dirección no puede estar vacía'
	}),
	avatar: Joi.string().optional().messages({
		'string.base': 'El avatar debe ser una cadena de texto'
	}),
	birthdate: Joi.date().optional().messages({
		'date.base': 'La fecha de nacimiento debe ser una fecha válida'
	}),
	city: Joi.string().optional().messages({
		'string.empty': 'La ciudad no puede estar vacía'
	}),
	country: Joi.string().optional().messages({
		'string.empty': 'El país no puede estar vacío'
	}),
	dni: Joi.string().optional().messages({
		'string.empty': 'El DNI no puede estar vacío'
	}),
	gender: Joi.string().valid('male', 'female', 'other').optional().messages({
		'string.empty': 'El género no puede estar vacío',
		'any.only': 'El género debe ser male, female u other'
	}),
	isActive: Joi.boolean().optional().messages({
		'boolean.base': 'El estado activo debe ser un valor booleano'
	}),
	phone: Joi.string().optional().messages({
		'string.empty': 'El teléfono no puede estar vacío'
	}),
	role: Joi.string().valid('USER', 'ADMIN').optional().messages({
		'string.empty': 'El rol no puede estar vacío',
		'any.only': 'El rol debe ser USER o ADMIN'
	}),
	token: Joi.string().optional().messages({
		'string.base': 'El token debe ser una cadena de texto'
	}),
	zipcode: Joi.string().optional().messages({
		'string.empty': 'El código postal no puede estar vacío'
	})
});

// Middleware para validar la creación de un usuario
const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body, { abortEarly: false });
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

// Middleware para validar la actualización de un usuario
const validateUpdateUser = (req, res, next) => {
	const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
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
	userSchema,
	updateUserSchema,
	validateUser,
	validateUpdateUser
};

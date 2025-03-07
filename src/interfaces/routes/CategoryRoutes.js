const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ExperienceValidator = require('../middlewares/validators/ExperienceValidator');

const categoryRoutes = express.Router();

// Rutas para Experience
categoryRoutes.post(
	'/',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateExperience,
	CategoryController.create
);

categoryRoutes.get('/', CategoryController.getAll);

categoryRoutes.get('/:id', CategoryController.getById);

categoryRoutes.put(
	'/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateUpdateExperience,
	CategoryController.update
);

categoryRoutes.delete(
	'/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	CategoryController.delete
);

module.exports = categoryRoutes;

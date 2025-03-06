const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ExperienceValidator = require('../middlewares/validators/ExperienceValidator');

const categoryRoutes = express.Router();

// Rutas para Experience
categoryRoutes.post(
	'/category',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateExperience,
	CategoryController.create
);

categoryRoutes.get('/category', CategoryController.getAll);

categoryRoutes.get('/category/:id', CategoryController.getById);

categoryRoutes.put(
	'/category/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateUpdateExperience,
	CategoryController.update
);

categoryRoutes.delete(
	'/category/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	CategoryController.delete
);

module.exports = categoryRoutes;

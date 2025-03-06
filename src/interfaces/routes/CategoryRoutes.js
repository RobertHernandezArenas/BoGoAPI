const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ExperienceValidator = require('../middlewares/validators/ExperienceValidator');

const categoryRouter = express.Router();

// Rutas para Experience
categoryRouter.post(
	'/category',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateExperience,
	CategoryController.create
);

categoryRouter.get('/category', CategoryController.getAll);

categoryRouter.get('/category/:id', CategoryController.getById);

categoryRouter.put(
	'/category/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateUpdateExperience,
	CategoryController.update
);

categoryRouter.delete(
	'/category/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	CategoryController.delete
);

module.exports = categoryRouter;

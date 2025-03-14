// DEPENDENCIES
import { Router } from 'express';

// IMPORTS
import { categoryController } from '../controllers/Category.Controller.js';
import {
	validateExperience,
	validateUpdateExperience
} from './../middlewares/validators/ExperienceValidator.js';

export const CategoryRoutes = Router();
CategoryRoutes.post('/', validateExperience, categoryController.create);

CategoryRoutes.get('/', categoryController.getAll);

CategoryRoutes.get(
	'/availables',
	categoryController.getCategoriesAvailablesbyExperience
);

CategoryRoutes.get('/:id', categoryController.getById);

CategoryRoutes.put('/:id', validateUpdateExperience, categoryController.update);

CategoryRoutes.delete('/:id', categoryController.delete);

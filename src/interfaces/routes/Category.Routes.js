// DEPENDENCIES
import { Router } from 'express';

// IMPORTS
import { categoryController } from '../controllers/Category.Controller.js';

export const CategoryRoutes = Router();

CategoryRoutes.post('/create', categoryController.create);
CategoryRoutes.get('/available/list', categoryController.getAvailableCategoriesByExperience);
CategoryRoutes.get('/list', categoryController.getAll);
CategoryRoutes.get('/', categoryController.getById);
CategoryRoutes.put('/update/:id', categoryController.update);
CategoryRoutes.delete('/delete/:id', categoryController.delete);

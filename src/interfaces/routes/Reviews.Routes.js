// DEPENDENCIES
import { Router } from 'express';
import { reviewController } from '../controllers/Review.Controller.js';

// IMPORTS

export const ReviewRoutes = Router();

ReviewRoutes.post('/create', reviewController.create);

ReviewRoutes.get('/list', reviewController.getAll);
// ReviewRoutes.get('/', reviewController.getById);
// ReviewRoutes.put('/update/:id', reviewController.update);
// ReviewRoutes.delete('/delete/:id', reviewController.delete);

// DEPENDENCIES
import { Router } from 'express';

// IMPORTS
import { reviewController } from '../controllers/Review.Controller.js';

export const ReviewRoutes = Router();

ReviewRoutes.post('/create', reviewController.create);

ReviewRoutes.get('/list', reviewController.getAll);
// ReviewRoutes.get('/', reviewController.getById);
// ReviewRoutes.put('/update/:id', reviewController.update);
// ReviewRoutes.delete('/delete/:id', reviewController.delete);

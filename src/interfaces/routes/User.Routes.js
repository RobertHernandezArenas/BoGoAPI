// DEPENDENCIES
import { Router } from 'express';

// IMPORTS
import { userController } from '../controllers/User.Controller.js';


export const UserRoutes = Router();


UserRoutes.post('/create', userController.create);

UserRoutes.get('/list', userController.getAll);

UserRoutes.get('/', userController.getById);

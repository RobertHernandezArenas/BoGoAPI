// DEPENDENCIES
import { Router } from 'express';

// IMPORTS
import { emailController } from '../controllers/Email.Controller.js';

export const EmailRoutes = Router().post('/send', emailController.create);

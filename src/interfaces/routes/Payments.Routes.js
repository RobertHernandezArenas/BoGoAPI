// DEPENDENCIES
import { Router } from 'express';

// IMPORTS
import { paymentController } from '../controllers/Payment.Controller.js';

export const PaymentRoutes = Router();

PaymentRoutes.post('/session', paymentController.getSession);

PaymentRoutes.get('/success', paymentController.getSuccess);

PaymentRoutes.get('/cancel', paymentController.getCancel);

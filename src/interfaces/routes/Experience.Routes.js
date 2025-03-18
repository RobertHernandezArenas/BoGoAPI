import { Router } from 'express';
import { experienceController } from '../controllers/Experience.Controller.js';

export const ExperienceRoutes = Router();

ExperienceRoutes.get('/list', experienceController.getAll);

ExperienceRoutes.get('/', experienceController.getById);

import { Router } from 'express';
import { experienceController } from '../controllers/Experience.Controller.js';

export const ExperienceRoutes = Router();

ExperienceRoutes.post('/create', experienceController.create);

ExperienceRoutes.get('/list', experienceController.getAll);

ExperienceRoutes.get('/', experienceController.getById);

ExperienceRoutes.get('/by-category', experienceController.getAllByCategoryId);

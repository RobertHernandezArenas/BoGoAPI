const express = require('express');
const ExperienceController = require('../controllers/ExperienceController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ExperienceValidator = require('../middlewares/validators/ExperienceValidator');

const router = express.Router();

// Rutas para Experience
router.post(
	'/experience',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateExperience,
	ExperienceController.create
);

router.get('/experience', /* authMiddleware, */ ExperienceController.getAll);

router.get('/experience/:id', authMiddleware, ExperienceController.getById);

router.put(
	'/experience/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateUpdateExperience,
	ExperienceController.update
);

router.delete(
	'/experience/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceController.delete
);

module.exports = router;

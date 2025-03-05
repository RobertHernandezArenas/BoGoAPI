const express = require('express');
const ExperienceController = require('../controllers/ExperienceController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ExperienceValidator = require('../middlewares/validators/ExperienceValidator');

const router = express.Router();

// Rutas para Experience
router.post(
	'/experiences',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateExperience,
	ExperienceController.create
);

router.get('/experiences', /* authMiddleware, */ ExperienceController.getAll);

router.get('/experiences/:id', authMiddleware, ExperienceController.getById);

router.put(
	'/experiences/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceValidator.validateUpdateExperience,
	ExperienceController.update
);

router.delete(
	'/experiences/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceController.delete
);

module.exports = router;

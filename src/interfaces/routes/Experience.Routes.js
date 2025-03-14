/*const express = require('express');
const ExperienceController = require('../controllers/ExperienceController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ExperienceValidator = require('../middlewares/validators/ExperienceValidator');

const router = express.Router();

// Rutas para Experience
router.post(
	'/',
	// authMiddleware,
	// roleMiddleware('ADMIN'),
	ExperienceValidator.validateExperience,
	ExperienceController.create
);

router.get('/', ExperienceController.getAll);

router.get(
	'/categories',
	 ExperienceController.getCategoriesAvailablesbyExperience
);

router.get('/:id' ExperienceController.getById);

router.put(
	'/:id',
	// authMiddleware,
	// roleMiddleware('ADMIN'),
	ExperienceValidator.validateUpdateExperience,
	ExperienceController.update
);

router.delete(
	'/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	ExperienceController.delete
);

module.exports = router;

*/

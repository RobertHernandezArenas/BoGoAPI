// router.post('/login', UserController.login);
// router.get('/', authMiddleware, UserController.getAll);
const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const UserValidator = require('../middlewares/validators/UserValidator');

const router = express.Router();

/**
	 * @openapi
	 * /jedis:
	 *   post:
	 *     summary: Create a new Jedi
	 *     tags: [Jedis]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Jedi'
	 *     responses:
	 *       201:
	 *         description: The Jedi was successfully created
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Jedi'
	 *       500:
	 *         description: Some server error
	 */
router
	.post('/users', UserValidator.validateUser, UserController.create)

	.get('/users/:id', authMiddleware, UserController.getById)

	.put(
		'/users/:id',
		authMiddleware,
		UserValidator.validateUpdateUser,
		UserController.update
	)

	.delete(
		'/users/:id',
		authMiddleware,
		roleMiddleware('ADMIN'),
		UserController.delete
	);

module.exports = router;

// router.post('/login', UserController.login);
// router.get('/', authMiddleware, UserController.getAll);
const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const UserValidator = require('../middlewares/validators/userValidator');

const router = express.Router();


router

	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     User:
	 *       type: object
	 *       required:
	 *         - name
	 *       properties:
	 *         id:
	 *           type: integer
	 *           description: The auto-generated id of the
	 *         name:
	 *           type: string
	 *           description: The name of the Jedi
	 *       example:
	 *         id: 1
	 *         name: Luke Skywalker
	 */

	/**
	 * @swagger
	 * tags:
	 *   name: Users
	 *   description: The users managing API
	 */
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

// router.post('/login', UserController.login);
// router.get('/', authMiddleware, UserController.getAll);
const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const UserValidator = require('../middlewares/validators/userValidator');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          description: The email of the user
 *          type: string
 *          format: email
 *          example: 2ZqHs@example.com
 *        password:
 *          description: The password of the user
 *          type: string
 *          example: password123
 *        name:
 * 			description: The name of the user
 *          type: string
 *          example: Robert
 *        surname:
 *          description: The surname of the user
 *          type: string
 *          example: Hernández
 *        address:
 *          description: The address of the user
 *          type: string
 *          example: 123 Main Street
 *        avatar:
 *          description: The avatar of the user
 *          type: string
 *          example: https://example.com/avatar.jpg
 *        birthdate:
 *          description: The birthdate of the user
 *          type: string
 *          format: date-time
 *          example: 1990-01-01T00:00:00.000Z
 *        city:
 *          description: The city of the user
 *          type: string
 *          example: A Coruña
 *        country:
 *          description: The country of the user
 *          type: string
 *          example: Spain
 *        dni:
 *          description: The DNI of the user
 *          type: string
 *          example: 12345678Z
 *        gender:
 * 			description: The gender of the user
 *          type: string
 *          example: male
 *        isActive:
 *          description: The status of the user
 *          type: boolean
 *          example: true
 *        phone:
 *          description: The phone of the user
 *          type: string
 *          example: 555-555-5555
 *        role:
 *          description: The role of the user
 *          type: string
 *          example: user
 *        token:
 *          description: The token of the user
 *          type: string
 *          example: token123
 *        zipcode:
 *          type: string
 *      example:
 *        email: 2ZqHs@example.com
 *        password: password123
 *        name: John
 *        surname: Doe
 *        address: 123 Main Street
 *        avatar: https://example.com/avatar.jpg
 *        birthdate: 1990-01-01T00:00:00.000Z
 *        city: Springfield
 *        country: USA
 *        dni: 12345678Z
 *        gender: male
 *        isActive: true
 *        phone: 555-555-5555
 *        role: user
 *        token: token123
 *        zipcode: 12345
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/users', UserValidator.validateUser, UserController.create);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a Jedi by id
 *     tags: [Jedis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jedi id
 *     responses:
 *       200:
 *         description: The Jedi description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jedi'
 *       404:
 *         description: The Jedi was not found
 */
router.get('/users/:id', authMiddleware, UserController.getById);

/**
 * @openapi
 * components:
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 */
router.put(
	'/users/:id',
	authMiddleware,
	UserValidator.validateUpdateUser,
	UserController.update
);

/**
 * @openapi
 * components:
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete(
	'/users/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	UserController.delete
);

// module.exports = router;

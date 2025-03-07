// router.post('/login', UserController.login);
// router.get('/', authMiddleware, UserController.getAll);
const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const UserValidator = require('../middlewares/validators/UserValidator');

const UserRoutes = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   Users:
 *    type: object
 *    required:
 *     - email
 *     - password
 *    properties:
 *     email:
 *      description: The email of the user
 *      type: string
 *      format: email
 *     password:
 *      description: The password of the user
 *      type: string
 *     name:
 *      description: The name of the user
 *      type: string
 *     surname:
 *      description: The surname of the user
 *      type: string
 *     address:
 *      description: The address of the user
 *      type: string
 *     avatar:
 *      description: The avatar of the user
 *      type: string
 *     birthdate:
 *      description: The birthdate of the user
 *      type: string
 *      format: date-time
 *     city:
 *      description: The city of the user
 *      type: string
 *     country:
 *      description: The country of the user
 *      type: string
 *     dni:
 *      description: The DNI of the user
 *      type: string
 *     gender:
 *      description: The gender of the user
 *      type: string
 *     isActive:
 *      description: The status of the user
 *      type: boolean
 *     phone:
 *      description: The phone of the user
 *      type: string
 *     role:
 *      description: The role of the user
 *      type: string
 *     token:
 *      description: The token of the user
 *      type: string
 *     zipcode:
 *      type: string
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
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: The Users was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */
UserRoutes.post('/users', UserValidator.validateUser, UserController.create);


/**
 * @openapi
 * /api/v1/users/:id:
 *   get:
 *     summary: Find a User by ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: The Users was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */
UserRoutes.get('/users/:id', authMiddleware, UserController.getById);

UserRoutes.put(
	'/users/:id',
	authMiddleware,
	UserValidator.validateUpdateUser,
	UserController.update
);

UserRoutes.delete(
	'/users/:id',
	authMiddleware,
	roleMiddleware('ADMIN'),
	UserController.delete
);

module.exports = UserRoutes;

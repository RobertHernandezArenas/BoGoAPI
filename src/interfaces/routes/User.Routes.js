import { Router } from 'express';
import { userController } from '../controllers/User.Controller.js';

export const UserRoutes = Router();

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
 *     phone:
 *      description: The phone of the user
 *      type: string
 *    example:
 *        email: 2ZqHs@example.com
 *        password: password123
 *        name: John
 *        surname: Doe
 *        address: 123 Main Street
 *        avatar: https://example.com/avatar.jpg
 *        birthdate: 1990-01-01T00:00:00.000Z
 *        city: A Coruña
 *        country: ESPAÑA
 *        phone: 666-666-666
 */

/**
 * @openapi
 * /v1/user/create:
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
UserRoutes.post('/create', userController.create);

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
// UserRoutes.get('/users/:id', authMiddleware, UserController.getById);
UserRoutes.get('/list', userController.getAll);
UserRoutes.get('/', userController.getById);

/* UserRoutes.put(
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
*/

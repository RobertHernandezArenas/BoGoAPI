const UserDTO = require('../../domain/dtos/UserDTO');
const UserService = require('../../domain/services/UserService');
const UserRepositorySequelize = require('../../infrastructure/repositories/UserRepositorySequelize');

const userRepository = new UserRepositorySequelize();
const userService = new UserService(userRepository);

class UserController {
	async create(req, res) {
		try {
			const userDTO = new UserDTO(req.body);
			const user = await userService.createUser(userDTO);
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const user = await userService.getUserById(req.params.id);
			if (!user) return res.status(404).json({ error: 'User not found' });
			const userDTO = new UserDTO(user);
			res.status(200).json(userDTO);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const userDTO = new UserDTO(req.body);
			const user = await userService.updateUser(req.params.id, userDTO);
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			await userService.deleteUser(req.params.id);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new UserController();

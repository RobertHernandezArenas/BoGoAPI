const UserEntity = require('../entities/UserEntity');

class UserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async createUser(userDTO) {
		// Convertir el DTO a una entidad
		const userEntity = new UserEntity(userDTO);

		// Llamar al repositorio para crear el usuario
		return await this.userRepository.create(userEntity);
	}

	async getUserById(id) {
		// Llamar al repositorio para obtener el usuario
		const userEntity = await this.userRepository.findById(id);

		// Si no se encuentra el usuario, devolver null
		if (!userEntity) return null;

		// Devolver la entidad (el controlador la transformará a DTO)
		return userEntity;
	}

	async updateUser(id, userDTO) {
		// Convertir el DTO a una entidad
		const userEntity = new UserEntity(userDTO);

		// Llamar al repositorio para actualizar el usuario
		return await this.userRepository.update(id, userEntity);
	}

	async deleteUser(id) {
		// Llamar al repositorio para eliminar el usuario
		return await this.userRepository.delete(id);
	}
}

module.exports = UserService;

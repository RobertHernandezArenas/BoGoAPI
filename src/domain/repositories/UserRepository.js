class UserRepository {
	/**
	 * Crea un nuevo usuario en la base de datos.
	 * @param {UserEntity} userEntity - Entidad del usuario.
	 * @returns {Promise<UserEntity>} - Usuario creado.
	 */
	async create(userEntity) {
		throw new Error('Method not implemented');
	}

	/**
	 * Busca un usuario por su ID.
	 * @param {string} id - ID del usuario.
	 * @returns {Promise<UserEntity|null>} - Usuario encontrado o null si no existe.
	 */
	async findById(id) {
		throw new Error('Method not implemented');
	}

	/**
	 * Busca un usuario por su email.
	 * @param {string} email - Email del usuario.
	 * @returns {Promise<UserEntity|null>} - Usuario encontrado o null si no existe.
	 */
	async findByEmail(email) {
		throw new Error('Method not implemented');
	}

	/**
	 * Actualiza un usuario existente.
	 * @param {string} id - ID del usuario.
	 * @param {UserEntity} userEntity - Datos actualizados del usuario.
	 * @returns {Promise<UserEntity|null>} - Usuario actualizado o null si no existe.
	 */
	async update(id, userEntity) {
		throw new Error('Method not implemented');
	}

	/**
	 * Elimina un usuario por su ID.
	 * @param {string} id - ID del usuario.
	 * @returns {Promise<boolean>} - True si el usuario fue eliminado, false si no existe.
	 */
	async delete(id) {
		throw new Error('Method not implemented');
	}
}

module.exports = UserRepository;

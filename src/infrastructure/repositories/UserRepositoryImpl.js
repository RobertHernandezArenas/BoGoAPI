const UserModel = require('../models/UserModel');
const UserEntity = require('../../domain/entities/UserEntity');
const UserRepository = require('../../domain/repositories/UserRepository');

class UserRepositoryImpl extends UserRepository {
	async create(userEntity) {
		const user = await UserModel.create(userEntity);
		return new UserEntity(user);
	}

	async findById(id) {
		const user = await UserModel.findByPk(id);
		if (!user) return null;
		return new UserEntity(user);
	}

	async findByEmail(email) {
		const user = await UserModel.findOne({ where: { email } });
		if (!user) return null;
		return new UserEntity(user);
	}

	async update(id, userEntity) {
		const [updated] = await UserModel.update(userEntity, { where: { id } });
		if (!updated) return null;
		const user = await UserModel.findByPk(id);
		return new UserEntity(user);
	}

	async delete(id) {
		const deleted = await UserModel.destroy({ where: { id } });
		return !!deleted;
	}
}

module.exports = UserRepositoryImpl;

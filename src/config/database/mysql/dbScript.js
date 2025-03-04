const UserModel = require('../../../infrastructure/models/UserModel');
const Utils = require('../../../utils');

async function fillDB() {
	await UserModel.sync({ alter: true });

	await UserModel.upsert({
		id: 'admin#1',
		name: 'Lorena Alexandra',
		surname: 'Victoria Yanez',
		email: 'admin1@mail.com',
		password: await Utils.adapters.encrypt('******', 10),
		role: 'ADMIN'
		// isAccountVerified: true
	});

	await UserModel.upsert({
		id: 'admin#2',
		name: 'José Robert',
		surname: 'Hernandez Arenas',
		email: 'admin2@mail.com',
		password: '******',
		role: 'ADMIN'
		// gender: 'MALE',
		// isAccountVerified: true
	});
}

module.exports = fillDB;

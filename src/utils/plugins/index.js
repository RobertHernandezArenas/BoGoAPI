const { encrypt, encryptCompare } = require('./bcrypt');
const { generateToken, verifyToken } = require('./jwt');
const { generateID } = require('./nanoID');
const { generateCode } = require('./generateCode');

const adapters = {
	encrypt,
	encryptCompare,
	generateID,
	generateToken,
	verifyToken,
	generateCode
};

module.exports = { adapters };

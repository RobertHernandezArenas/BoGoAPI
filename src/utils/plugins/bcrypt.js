const bcrypt = require('bcrypt');

const encrypt = (password, salt) => {
	return bcrypt.hash(password, salt);
};

const encryptCompare = (passwordTo, passwordFrom) => {
	return bcrypt.compare(passwordTo, passwordFrom);
};

module.exports = {
	encrypt,
	encryptCompare
};

const JWT = require('jsonwebtoken');

const generateToken = (object, secret, expiresIn = '1d') => {
	return JWT.sign(object, secret, { expiresIn: expiresIn });
};

const verifyToken = (token, secret) => {
	return JWT.verify(token, secret);
};

module.exports = {
	generateToken,
	verifyToken
};

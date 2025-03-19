import bcrypt from 'bcrypt';

export const encrypt = (password, salt) => {
	return bcrypt.hashSync(password, salt);
};

export const encryptCompare = (passwordTo, passwordFrom) => {
	return bcrypt.compare(passwordTo, passwordFrom);
};

// const ShortUniqueId = require('short-unique-id');

const generateID = (lengthID) => {
	const { randomUUID } = new ShortUniqueId({ length: lengthID });
	return randomUUID();
};

module.exports = {
	generateID
};

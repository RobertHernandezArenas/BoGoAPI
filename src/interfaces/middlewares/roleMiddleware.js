const roleMiddleware = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res
				.status(403)
				.json({ error: 'Access denied. Insufficient permissions.' });
		}
		next();
	};
};

module.exports = roleMiddleware;

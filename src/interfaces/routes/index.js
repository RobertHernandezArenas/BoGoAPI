const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerDOC = require('../docs/swagger');
const CategoryRoutes = require('./CategoryRoutes');
const ExperienceRoutes = require('./ExperienceRoutes');
const UserRoutes = require('./UserRoutes');
const errorHandler = require('../middlewares/errorHandler');

const AppRouter = express.Router();

AppRouter.use('/v1/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDOC))
AppRouter.use('/v1/categories', CategoryRoutes);
AppRouter.use('/v1/experiences',ExperienceRoutes);
AppRouter.use('/v1/users', UserRoutes);
AppRouter.use('*', errorHandler);



module.exports = AppRouter;

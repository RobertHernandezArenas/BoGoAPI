// DEPENDENCIES
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { AppRouter } from './interfaces/routes/index.Routes.js';
import { AppConfig } from './config/index.js';

// IMPORTS
export const App = express();
const PORT = AppConfig.CONSTANTS.PORT || 3000;

App.use(morgan('dev'))
	.use(
		cors({
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
			headers: ['Content-Type', 'Authorization'],
			credentials: true
		})
	)
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(express.static('public'))
	.use('/', AppRouter)

	.listen(PORT, () => {
		try {
			console.log('🟢 Server ON: http://localhost:' + PORT);
		} catch (error) {
			console.error('🔴 Server OFF:', error.message);
		}
	});

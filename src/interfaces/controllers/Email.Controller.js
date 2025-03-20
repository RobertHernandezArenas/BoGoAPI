import { CONSTANTS } from '../../config/envs.js';
import { getMySQLConnection } from '../../config/database/mysql/index.js';
import { transporter } from '../../config/nodemailer.js';

export class EmailController {
	async create(req, res) {
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);
		try {
			const { from, to, subject, text, html, attachments } = req.body;

			const email = await transporter.sendMail({
				from,
				to,
				subject,
				text,
				html,
				attachments
			});

			console.log(email);
			res.status(201).json({
				error: false,
				data: { message: 'Category was created' }
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		} finally {
			dbConnection.release();
		}
	}
}

export const emailController = new EmailController();

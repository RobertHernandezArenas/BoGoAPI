import { createTransport } from "nodemailer";
import { config } from "../../config";

export const emailService = {
	send(mailOptions) {
		try {
			const transporter = createTransport(config.nodemailer);
			transporter.sendMail(mailOptions);
		} catch (error) {
			return error;
		}
	},
};

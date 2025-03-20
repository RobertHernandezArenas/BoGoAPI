import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { config } from "../../../config";
const emailTemplate = path.join(__dirname, "./createUsersEmail.html");

const imagePathEmail = path.join(config.pathFiles.logo);
//const headerBGPathEmail = path.join(config.pathFiles.email.header_bg);

export const addMail = data => {
	const { root } = config.api;
	const activationLink = `${root}/users/${data.id}/${config.email.confirm.activateQuery}${data.activation_code}`;
	const source = fs.readFileSync(emailTemplate, "utf-8").toString();
	const template = handlebars.compile(source);
	const replacements = {
		imagePathEmail,
		activationLink,
		//headerBGPathEmail,
	};
	const htmlToSend = template(replacements);
	return {
		from: `Luis Quintero Hernández<${config.nodemailer.auth.user}>`,
		to: `${data.email}`,
		subject: "Confirmar registro de la cuenta",
		text: "Haz click en el boton para activar la cuenta!",
		html: htmlToSend,
		attachments: [
			{
				filename: "header-bg.jpg",
				// path: headerBGPathEmail,
				cid: "headerbg",
			},
		],
	};
};

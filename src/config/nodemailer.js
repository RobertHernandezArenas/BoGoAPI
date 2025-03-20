import nodemailer from 'nodemailer';

// Configura el transporte de correo
export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	service: 'Gmail',
	auth: {
		user: 'airbusjayrobert@gmail.com', // Usuario del correo
		pass: 'ftue qpgl qppy gtzs' // Contraseña del correo
	}
});

// Verifica la conexión del transporte
transporter.verify((error) => {
	if (error) {
		console.error('Error al verificar el transporte de correo:', error);
	} else {
		console.log('Servidor de correo listo para enviar mensajes');
	}
});

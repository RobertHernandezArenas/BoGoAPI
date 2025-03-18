import { getMySQLConnection } from './src/config/database/mysql/index.js';
import { CONSTANTS } from './src/config/envs.js';

const args = process.argv;

const addData = args[2] === '--data';

async function createTables(connection) {
	try {
		await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255),
                address TEXT,
                avatar VARCHAR(255),
                birthdate DATE,
                city VARCHAR(255),
                country VARCHAR(255),
                dni VARCHAR(20) UNIQUE,
                gender ENUM('male', 'female', 'other'),
                isActive BOOLEAN DEFAULT TRUE,
                phone VARCHAR(20),
                role ENUM('admin', 'user') DEFAULT 'user',
                zipcode VARCHAR(20),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
		console.log('✅ USER table created');

		await connection.query(`
            CREATE TABLE IF NOT EXISTS category (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image VARCHAR(255),
                experience_id INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
		console.log('✅ CATEGORY table created');

		await connection.query(`
            CREATE TABLE IF NOT EXISTS experience (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                duration INT,
                dateTo DATE,
                dateFrom DATE,
                location VARCHAR(255),
                capacity INT,
                stock INT,
                availability BOOLEAN DEFAULT TRUE,
                category_id INT NOT NULL,
                reviews TEXT,
                image VARCHAR(255),
                user_id INT NOT NULL,
                isFavorite BOOLEAN DEFAULT FALSE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES CATEGORY(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE
            );
        `);
		console.log('✅ EXPERIENCE table created');

		await connection.query(`
            CREATE TABLE IF NOT EXISTS review (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rating INT CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                user_id INT NOT NULL,
                experience_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE,
                FOREIGN KEY (experience_id) REFERENCES EXPERIENCE(id) ON DELETE CASCADE
            );
        `);
		console.log('✅ REVIEW table created');

		await connection.query(`
            CREATE TABLE IF NOT EXISTS cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                items TEXT,
                totalPrice DECIMAL(10, 2),
                paymentMethod VARCHAR(255),
                isPaid BOOLEAN DEFAULT FALSE,
                checkoutDate TIMESTAMP,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE
            );
        `);
		console.log('✅ CART table created');
	} catch (error) {
		console.error('[Error creating tables]:', error.message);
	}
}

// Función para borrar la base de datos
async function dropDatabase(connection) {
	try {
		await connection.query(
			`DROP DATABASE IF EXISTS ${CONSTANTS.DATABASE.MYSQL.DB_NAME};`
		);
		console.log(`🔥 Database ${CONSTANTS.DATABASE.MYSQL.DB_NAME} dropped`);
	} catch (error) {
		console.error('[Error dropping database]:', error.message);
	}
}

// Función para borrar todas las tablas
async function dropTables(connection) {
	try {
		await connection.query('DROP TABLE IF EXISTS users;');
		console.log('🔥 users table dropped');
		await connection.query('DROP TABLE IF EXISTS categories;');
		console.log('🔥 categories table dropped');
		await connection.query('DROP TABLE IF EXISTS experiences;');
		console.log('🔥 experiences table dropped');
		await connection.query('DROP TABLE IF EXISTS reviews;');
		console.log('🔥 reviews table dropped');
		await connection.query('DROP TABLE IF EXISTS carts;');
		console.log('🔥 carts table dropped');
	} catch (error) {
		console.error('[Error dropping tables]:', error.message);
	}
}

// Función para vaciar tablas
async function truncateTables(connection) {
	try {
		console.log('⏳ Truncating tables...');
		await connection.query('SET FOREIGN_KEY_CHECKS = 0'); // Desactivar comprobaciones de claves foráneas temporalmente
		await connection.query('TRUNCATE TABLE users');
		console.log('🔥 Users table truncated');
		await connection.query('TRUNCATE TABLE categories');
		console.log('🔥 Categories table truncated');
		await connection.query('TRUNCATE TABLE experiences');
		console.log('🔥 Experiences table truncated');
		await connection.query('TRUNCATE TABLE reviews');
		console.log('🔥 Reviews table truncated');
		await connection.query('TRUNCATE TABLE carts');
		console.log('🔥 Carts table truncated');
		await connection.query('SET FOREIGN_KEY_CHECKS = 1'); // Reactivar comprobaciones de claves foráneas
		console.log('✅ Tables truncated successfully');
	} catch (error) {
		console.error('[Error truncating tables]:', error.message);
		throw error;
	}
}

async function main() {
	try {
		// Conectarse sin especificar una base de datos
		const connection = await getMySQLConnection();

		// Drop database if it exists
		await dropDatabase(connection);

		// Create database if it doesn't exist
		try {
			await connection.query(
				`CREATE DATABASE IF NOT EXISTS ${CONSTANTS.DATABASE.MYSQL.DB_NAME};`
			);
			console.log(
				`🔋 Database ${CONSTANTS.DATABASE.MYSQL.DB_NAME} was created`
			);
		} catch (error) {
			console.log('[Error creating database]:', error.message);
		}

		// Use database
		try {
			await connection.query(`USE ${CONSTANTS.DATABASE.MYSQL.DB_NAME};`);
			console.log(`✨ Using ${CONSTANTS.DATABASE.MYSQL.DB_NAME} database `);
		} catch (error) {
			console.log('[Error using database]:', error.message);
		}

		// Release connection
		connection.release();

		// Reconectar con la base de datos recién creada
		const dbConnection = await getMySQLConnection(
			CONSTANTS.DATABASE.MYSQL.DB_NAME
		);

		await createTables(dbConnection);

		/*
		await dbConnection.query('DROP TABLE IF EXISTS users');
		console.log('🔥 users table dropped');
		await dbConnection.query('DROP TABLE IF EXISTS categories');
		console.log('🔥 categories table dropped');
		await dbConnection.query('DROP TABLE IF EXISTS experiences');
		console.log('🔥 experiences table dropped');
		await dbConnection.query('DROP TABLE IF EXISTS reviews');
		console.log('🔥 reviews table dropped');
      */

		const users = await dbConnection.query(`
			INSERT INTO user (id, email, name, surname, address, avatar, birthdate, city, country, dni, gender, isActive, phone, role, zipcode) VALUES
(1, 'admin@example.com', 'Admin', 'User', '123 Admin Street', 'https://randomuser.me/api/portraits/men/75.jpg', '1985-05-15', 'Madrid', 'Spain', '12345678A', 'male', TRUE, '+34123456789', 'admin', '28001');
;`);

		const categories = await dbConnection.query(`
			INSERT INTO category (id, name, image, createdAt, updatedAt) VALUES
				(-1, 'Explorar', 'https:/bookandgo.apieverywhere.com/image/category/explorer.jpg', '2025-03-18 00:13:12', '2025-03-18 00:13:12'),
				(1, 'Gastronomía', 'https:/bookandgo.apieverywhere.com/image/category/gastronomy.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(2, 'Relax', 'https:/bookandgo.apieverywhere.com/image/category/relax.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(3, 'Deportes', 'https:/bookandgo.apieverywhere.com/image/category/sports.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(4, 'Aventura', 'https:/bookandgo.apieverywhere.com/image/category/adventure.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(5, 'Cultura', 'https:/bookandgo.apieverywhere.com/image/category/culture.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(6, 'Vida Nocturna', 'https:/bookandgo.apieverywhere.com/image/category/nightlife.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(7, 'Musica', 'https:/bookandgo.apieverywhere.com/image/category/music.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10'),
				(8, 'Videojuegos', 'https:/bookandgo.apieverywhere.com/image/category/gaming.jpg', '2025-03-18 00:13:10', '2025-03-18 00:13:10');
			`);

		const experiences = await dbConnection.query(`
			INSERT INTO experience (id, name, description, price, duration, dateTo, dateFrom, location, capacity, stock, availability, category_id, image, user_id, isFavorite, createdAt, updatedAt) VALUES
				(1, 'Cena gourmet en El Celler de Can Roca', 'Experimenta una cena inolvidable en uno de los mejores restaurantes del mundo.', 200.00, NULL, '2024-12-31 23:59:59', '2024-01-01 19:00:00', 'Girona, Cataluña', NULL, 5, TRUE, 1, 'https://lh3.googleusercontent.com/p/AF1QipO95tEFDDA6x4e6QGNF6ONRRrWe-6tmTqGxBvEl=s680-w680-h510', 1, FALSE, NOW(), NULL),
				(2, 'Masaje relajante en spa natural', 'Relájate con un masaje holístico en un entorno natural.', 80.00, 1, '2024-12-31 18:00:00', '2024-01-01 10:00:00', 'Costa Brava, Girona', 20, 15, TRUE, 2, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(3, 'Yoga al amanecer en la playa', 'Conecta con tu mente y cuerpo mientras disfrutas del amanecer.', 40.00, 1, '2024-12-31 08:00:00', '2024-01-01 06:00:00', 'Barcelona, Cataluña', 30, 25, TRUE, 2, 'https://images.unsplash.com/photo-1587216829015-3e15edf56137?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(4, 'Excursión a los Picos de Europa', 'Explora las montañas más impresionantes de España.', 60.00, 6, '2024-10-31 18:00:00', '2024-03-01 08:00:00', 'Asturias', 15, 10, TRUE, 4, 'https://buendia-pro-app.s3.eu-west-3.amazonaws.com/s3fs-public/2024-12/excursion-picos-europa-desde-oviedo.jpg?VersionId=Z9n104HK1b9cx71AZUyr2GXgWcRSv73q', 1, FALSE, NOW(), NULL),
				(5, 'Kayak en el río Ebro', 'Adéntrate en el corazón de la naturaleza mientras navegas por el río Ebro.', 50.00, 3, '2024-10-31 17:00:00', '2024-04-01 09:00:00', 'Zaragoza, Aragón', 20, 15, TRUE, 4, 'https://aventuratoursalou.com/images/20200526_141824.jpg', 1, FALSE, NOW(), NULL),
				(6, 'Partido de fútbol en el Camp Nou', 'Vive la pasión del fútbol en el estadio del FC Barcelona.', 100.00, 2, '2024-12-31 22:00:00', '2024-01-01 15:00:00', 'Barcelona, Cataluña', 99000, 500, TRUE, 3, 'https://www.fcbarcelona.com/photo-resources/2021/08/09/c4f2dddd-2152-4b8b-acf8-826b4377e29d/Camp-Nou-4.jpg?width=3200&height=2000', 1, FALSE, NOW(), NULL),
				(7, 'Escalada en roca en Margalef', 'Prueba tus habilidades en uno de los destinos de escalada más famosos de Europa.', 70.00, 4, '2024-10-31 18:00:00', '2024-03-01 08:00:00', 'Tarragona, Cataluña', 10, 8, TRUE, 3, 'https://media-cdn.tripadvisor.com/media/photo-s/12/64/d6/9d/escalada-en-margalef.jpg', 1, FALSE, NOW(), NULL),
				(8, 'Visita guiada al Museo del Prado', 'Descubre las obras maestras del arte español en el Museo del Prado.', 30.00, 2, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'Madrid', 50, 40, TRUE, 5, 'https://content3.cdnprado.net/imagenes/Documentos/imgsem/c9/c928/c9284595-b7c7-ff6b-92bf-b42cbea3ffdb/5612ce87-ade3-78f4-0baa-b9df91dc7269.jpg', 1, FALSE, NOW(), NULL),
				(9, 'Taller de flamenco en Sevilla', 'Aprende los movimientos y ritmos del flamenco auténtico.', 50.00, 1, '2024-12-31 22:00:00', '2024-01-01 18:00:00', 'Sevilla, Andalucía', 20, 15, TRUE, 5, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/12/7b/d2/81.jpg', 1, FALSE, NOW(), NULL),
				(10, 'Noche de videojuegos en LAN Party', 'Únete a una noche épica de gaming con amigos.', 20.00, 8, '2024-12-31 23:59:59', '2024-01-01 18:00:00', 'Madrid', 100, 80, TRUE, 8, 'https://fotografias.larazon.es/clipping/cmsimages02/2022/11/22/8287004F-0C2D-4C4A-BC07-303CB88869FE/98.jpg?crop=3000,1688,x0,y156&width=1900&height=1069&optimize=low&format=webply', 1, FALSE, NOW(), NULL),
				(11, 'Tour de tapas por el Barrio Gótico', 'Descubre los sabores tradicionales de Barcelona en un recorrido gastronómico.', 45.00, 3, '2024-12-31 22:00:00', '2024-01-01 18:00:00', 'Barcelona, Cataluña', 15, 10, TRUE, 1, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(12, 'Retiro de meditación en la montaña', 'Desconecta del estrés y reconéctate contigo mismo en un entorno natural.', 120.00, 2, '2024-11-30 18:00:00', '2024-03-01 10:00:00', 'Pirineos, Cataluña', 25, 20, TRUE, 2, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(13, 'Clase de surf en la playa de Zarautz', 'Aprende a surfear en una de las playas más famosas del País Vasco.', 65.00, 2, '2024-10-31 17:00:00', '2024-05-01 09:00:00', 'Zarautz, País Vasco', 12, 8, TRUE, 3, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(14, 'Parapente en los Alpes', 'Vuela sobre los Alpes y disfruta de vistas espectaculares.', 150.00, 1, '2024-09-30 18:00:00', '2024-06-01 10:00:00', 'Alpes, Francia', 8, 6, TRUE, 4, 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(15, 'Visita al Teatro Romano de Mérida', 'Explora uno de los teatros romanos mejor conservados de España.', 25.00, 2, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'Mérida, Extremadura', 40, 30, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(16, 'Fiesta en una discoteca flotante', 'Disfruta de una noche inolvidable en una discoteca sobre el agua.', 60.00, 5, '2024-12-31 06:00:00', '2024-01-01 22:00:00', 'Ibiza, Islas Baleares', 200, 150, TRUE, 6, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(17, 'Concierto acústico en una bodega', 'Disfruta de música en vivo en un entorno íntimo y único.', 40.00, 2, '2024-12-31 23:00:00', '2024-01-01 20:00:00', 'La Rioja', 50, 40, TRUE, 7, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(18, 'Torneo de videojuegos retro', 'Participa en un torneo de videojuegos clásicos y demuestra tus habilidades.', 15.00, 4, '2024-12-31 22:00:00', '2024-01-01 16:00:00', 'Valencia', 30, 25, TRUE, 8, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(19, 'Cata de vinos en una bodega centenaria', 'Descubre los secretos de los vinos más exclusivos en una bodega histórica.', 55.00, 2, '2024-12-31 20:00:00', '2024-01-01 12:00:00', 'Ribera del Duero, Castilla y León', 20, 15, TRUE, 1, 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(20, 'Escape room temático de misterio', 'Resuelve enigmas y escapa de una habitación llena de secretos.', 35.00, 1, '2024-12-31 23:00:00', '2024-01-01 10:00:00', 'Madrid', 6, 4, TRUE, 8, 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(21, 'Paseo por la Torre de Hércules', 'Descubre el faro romano más antiguo del mundo y disfruta de las vistas al mar.', 10.00, 1, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'A Coruña, Galicia', 30, 25, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(22, 'Ruta en kayak por la ría de A Coruña', 'Navega por las aguas tranquilas de la ría y disfruta de la naturaleza.', 35.00, 2, '2024-10-31 18:00:00', '2024-04-01 09:00:00', 'A Coruña, Galicia', 12, 10, TRUE, 4, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(23, 'Tour gastronómico por A Coruña', 'Prueba los platos típicos de Galicia en los mejores restaurantes de la ciudad.', 50.00, 3, '2024-12-31 22:00:00', '2024-01-01 18:00:00', 'A Coruña, Galicia', 15, 12, TRUE, 1, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(24, 'Visita al Parque de María Luisa en Elche', 'Disfruta de un paseo relajante por uno de los parques más bonitos de la ciudad.', 5.00, 1, '2024-12-31 20:00:00', '2024-01-01 08:00:00', 'Elche, Comunidad Valenciana', 50, 40, TRUE, 2, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(25, 'Exploración del Palmeral de Elche', 'Conoce el famoso Palmeral de Elche, Patrimonio de la Humanidad.', 15.00, 2, '2024-12-31 18:00:00', '2024-01-01 10:00:00', 'Elche, Comunidad Valenciana', 20, 15, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(26, 'Clase de paddle surf en la playa de Riazor', 'Aprende a hacer paddle surf en una de las playas más famosas de A Coruña.', 40.00, 2, '2024-10-31 17:00:00', '2024-05-01 09:00:00', 'A Coruña, Galicia', 10, 8, TRUE, 3, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(27, 'Visita al Muelle de las Delicias en Elche', 'Disfruta de un paseo por el muelle y contempla los barcos tradicionales.', 0.00, 1, '2024-12-31 20:00:00', '2024-01-01 08:00:00', 'Elche, Comunidad Valenciana', 100, 90, TRUE, 2, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(28, 'Cata de mariscos en A Coruña', 'Prueba los mejores mariscos frescos de la costa gallega.', 60.00, 2, '2024-12-31 22:00:00', '2024-01-01 12:00:00', 'A Coruña, Galicia', 20, 15, TRUE, 1, 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(29, 'Tour nocturno por el casco antiguo de Elche', 'Descubre los secretos y leyendas de Elche en un recorrido nocturno.', 20.00, 2, '2024-12-31 23:00:00', '2024-01-01 20:00:00', 'Elche, Comunidad Valenciana', 25, 20, TRUE, 6, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(30, 'Concierto de música tradicional gallega', 'Disfruta de un concierto en vivo con gaitas y sonidos tradicionales.', 25.00, 2, '2024-12-31 22:00:00', '2024-01-01 19:00:00', 'A Coruña, Galicia', 100, 80, TRUE, 7, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(31, 'Visita al Museo Guggenheim de Bilbao', 'Explora una de las obras arquitectónicas más impresionantes del mundo y su colección de arte moderno.', 15.00, 2, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'Bilbao, País Vasco', 50, 40, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(32, 'Paseo en barco por la ría de Bilbao', 'Disfruta de un recorrido en barco por la ría de Bilbao y admira la ciudad desde el agua.', 25.00, 1, '2024-10-31 18:00:00', '2024-04-01 10:00:00', 'Bilbao, País Vasco', 20, 15, TRUE, 4, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(33, 'Tour de pintxos por el Casco Viejo de Bilbao', 'Prueba los pintxos más deliciosos de la ciudad en un recorrido gastronómico.', 40.00, 3, '2024-12-31 22:00:00', '2024-01-01 18:00:00', 'Bilbao, País Vasco', 15, 12, TRUE, 1, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(34, 'Visita al Acuario de Gijón', 'Descubre la vida marina en uno de los acuarios más importantes del norte de España.', 12.00, 2, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'Gijón, Asturias', 30, 25, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(35, 'Ruta en bicicleta por la costa de Gijón', 'Recorre la costa asturiana en bicicleta y disfruta de paisajes espectaculares.', 20.00, 3, '2024-10-31 18:00:00', '2024-04-01 09:00:00', 'Gijón, Asturias', 10, 8, TRUE, 3, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(36, 'Cata de sidra en Oviedo', 'Prueba la sidra asturiana en una experiencia auténtica con llagar tradicional.', 30.00, 2, '2024-12-31 22:00:00', '2024-01-01 12:00:00', 'Oviedo, Asturias', 20, 15, TRUE, 1, 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(37, 'Visita a la Catedral de Santiago de Compostela', 'Explora uno de los lugares más emblemáticos del Camino de Santiago.', 10.00, 2, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'Santiago de Compostela, Galicia', 50, 40, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(38, 'Tour nocturno por el casco histórico de Sevilla', 'Descubre los secretos y leyendas de Sevilla en un recorrido nocturno.', 20.00, 2, '2024-12-31 23:00:00', '2024-01-01 20:00:00', 'Sevilla, Andalucía', 25, 20, TRUE, 6, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(39, 'Visita al Real Alcázar de Sevilla', 'Explora los jardines y palacios de uno de los monumentos más impresionantes de España.', 15.00, 2, '2024-12-31 20:00:00', '2024-01-01 10:00:00', 'Sevilla, Andalucía', 40, 30, TRUE, 5, 'https://images.unsplash.com/photo-1623160243599-5d0e8a2c9c0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL),
				(40, 'Ruta en kayak por el río Segura en Murcia', 'Navega por el río Segura y disfruta de la naturaleza de la región.', 35.00, 2, '2024-10-31 18:00:00', '2024-04-01 09:00:00', 'Murcia', 12, 10, TRUE, 4, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1, FALSE, NOW(), NULL);
			`);
		/* */
		console.log('Initial structure created');

		// Liberar la conexión final
		dbConnection.release();
	} catch (error) {
		console.error('Error during initialization:', error);
	} finally {
		process.exit();
	}
}

main();

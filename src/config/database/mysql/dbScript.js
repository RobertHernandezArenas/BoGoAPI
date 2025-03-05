const ExperienceModel = require('../../../infrastructure/models/ExperienceModel');
const UserModel = require('../../../infrastructure/models/UserModel');
const Utils = require('../../../utils');

async function fillDB() {
	await UserModel.sync({ alter: true });
	await ExperienceModel.sync({ alter: true });

	await UserModel.upsert({
		id: 'admin#2',
		name: 'Robert',
		surname: 'Hernandez Arenas',
		email: 'admin2@mail.com',
		password: '******',
		role: 'ADMIN'
	});

	const experiences = [
		// Gastronomía
		{
			id: 'experience#2',
			name: 'Cena gourmet en El Celler de Can Roca',
			description:
				'Experimenta una cena inolvidable en uno de los mejores restaurantes del mundo.',
			price: 200,
			duration: null,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Girona, Cataluña',
			capacity: null,
			stock: 5,
			availability: true,
			category: 'gastronomia',
			image:
				'https://images.unsplash.com/photo-1534681479-f4f89d8e2ab6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		// Relax
		{
			id: 'experience#11',
			name: 'Masaje relajante en spa natural',
			description: 'Relájate con un masaje holístico en un entorno natural.',
			price: 80,
			duration: 1.5,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Costa Brava, Girona',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'relax',
			image:
				'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#12',
			name: 'Yoga al amanecer en la playa',
			description:
				'Conecta con tu mente y cuerpo mientras disfrutas del amanecer.',
			price: 40,
			duration: 1,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Barcelona, Cataluña',
			capacity: 30,
			stock: 25,
			availability: true,
			category: 'relax',
			image:
				'https://images.unsplash.com/photo-1504496842168-3c9b032c10d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		// Aire Libre
		{
			id: 'experience#21',
			name: 'Excursión a los Picos de Europa',
			description: 'Explora las montañas más impresionantes de España.',
			price: 60,
			duration: 6,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Asturias',
			capacity: 15,
			stock: 10,
			availability: true,
			category: 'aire libre',
			image:
				'https://images.unsplash.com/photo-1560759609-14828734a0ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#22',
			name: 'Kayak en el río Ebro',
			description:
				'Adéntrate en el corazón de la naturaleza mientras navegas por el río Ebro.',
			price: 50,
			duration: 3,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Zaragoza, Aragón',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'aire libre',
			image:
				'https://images.pexels.com/photos/356002/pexels-photo-356002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		// Deportes
		{
			id: 'experience#31',
			name: 'Partido de fútbol en el Camp Nou',
			description: 'Vive la pasión del fútbol en el estadio del FC Barcelona.',
			price: 100,
			duration: 2,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Barcelona, Cataluña',
			capacity: 99000,
			stock: 500,
			availability: true,
			category: 'deportes',
			image:
				'https://images.unsplash.com/photo-1589334434630-1b0c9f6041a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#32',
			name: 'Escalada en roca en Margalef',
			description:
				'Prueba tus habilidades en uno de los destinos de escalada más famosos de Europa.',
			price: 70,
			duration: 4,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Tarragona, Cataluña',
			capacity: 10,
			stock: 8,
			availability: true,
			category: 'deportes',
			image:
				'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		// Cultural
		{
			id: 'experience#41',
			name: 'Visita guiada al Museo del Prado',
			description:
				'Descubre las obras maestras del arte español en el Museo del Prado.',
			price: 30,
			duration: 2,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Madrid',
			capacity: 50,
			stock: 40,
			availability: true,
			category: 'cultural',
			image:
				'https://images.unsplash.com/photo-1557682954-a0454f8cb1d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#42',
			name: 'Taller de flamenco en Sevilla',
			description: 'Aprende los movimientos y ritmos del flamenco auténtico.',
			price: 50,
			duration: 1.5,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Sevilla, Andalucía',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'cultural',
			image:
				'https://images.pexels.com/photos/1194195/pexels-photo-1194195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		// Gaming
		{
			id: 'experience#51',
			name: 'Noche de videojuegos en LAN Party',
			description: 'Únete a una noche épica de gaming con amigos.',
			price: 20,
			duration: 8,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Madrid',
			capacity: 100,
			stock: 80,
			availability: true,
			category: 'gaming',
			image:
				'https://images.unsplash.com/photo-1522364724200-94943f734c3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#52',
			name: 'Torneo de esports',
			description: 'Participa en un torneo de esports con premios en efectivo.',
			price: 30,
			duration: 4,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Barcelona, Cataluña',
			capacity: 50,
			stock: 40,
			availability: true,
			category: 'gaming',
			image:
				'https://images.pexels.com/photos/356003/pexels-photo-356003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		// Música
		{
			id: 'experience#61',
			name: 'Concierto de jazz en el Palau de la Música',
			description:
				'Disfruta de un concierto íntimo de jazz en un entorno único.',
			price: 40,
			duration: 2,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Barcelona, Cataluña',
			capacity: 200,
			stock: 150,
			availability: true,
			category: 'musica',
			image:
				'https://images.unsplash.com/photo-1542744173-947020f897f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#62',
			name: 'Festival de música electrónica',
			description:
				'Vive la energía de un festival de música electrónica al aire libre.',
			price: 80,
			duration: 8,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Ibiza',
			capacity: 10000,
			stock: 5000,
			availability: true,
			category: 'musica',
			image:
				'https://images.pexels.com/photos/270012/pexels-photo-270012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Gastronomía
		{
			id: 'experience#63',
			name: 'Taller de cocina italiana',
			description:
				'Aprende a cocinar pasta fresca y pizzas artesanales con chefs profesionales.',
			userId: 'admin#1',
			price: 75,
			duration: 2.5,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Madrid',
			capacity: 12,
			stock: 8,
			availability: true,
			category: 'gastronomia',
			image:
				'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#64',
			name: 'Degustación de vinos en La Rioja',
			description:
				'Descubre los mejores vinos de La Rioja en una bodega centenaria.',
			userId: 'admin#1',
			price: 90,
			duration: 3.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'La Rioja',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'gastronomia',
			image:
				'https://images.unsplash.com/photo-1589334434630-1b0c9f6041a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},

		// Relax
		{
			id: 'experience#65',
			name: 'Retiro de meditación mindfulness',
			description: 'Conecta contigo mismo en un retiro de meditación guiada.',
			userId: 'admin#1',
			price: 120,
			duration: 4.5,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Mallorca',
			capacity: 10,
			stock: 8,
			availability: true,
			category: 'relax',
			image:
				'https://images.pexels.com/photos/356003/pexels-photo-356003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#66',
			name: 'Baño termal en aguas naturales',
			description: 'Relájate en piscinas termales rodeadas de naturaleza.',
			userId: 'admin#1',
			price: 50,
			duration: 2.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Cuenca',
			capacity: 30,
			stock: 25,
			availability: true,
			category: 'relax',
			image:
				'https://images.unsplash.com/photo-1570849370777-36a1e50631e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},

		// Aire Libre
		{
			id: 'experience#67',
			name: 'Senderismo en el Parque Nacional de Ordesa',
			description:
				'Explora las impresionantes montañas y cascadas del Parque Nacional de Ordesa.',
			userId: 'admin#1',
			price: 45,
			duration: 5.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Huesca',
			capacity: 15,
			stock: 12,
			availability: true,
			category: 'aire libre',
			image:
				'https://images.unsplash.com/photo-1560759609-14828734a0ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#68',
			name: 'Observación de estrellas en el desierto de Tabernas',
			description:
				'Disfruta de un cielo estrellado en uno de los desiertos más hermosos de Europa.',
			userId: 'admin#1',
			price: 30,
			duration: 3.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Almería',
			capacity: 25,
			stock: 20,
			availability: true,
			category: 'aire libre',
			image:
				'https://images.pexels.com/photos/1055083/pexels-photo-1055083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},

		// Deportes
		{
			id: 'experience#69',
			name: 'Clase de surf en Maspalomas',
			description: 'Aprende a surfear en las olas de la playa de Maspalomas.',
			userId: 'admin#1',
			price: 60,
			duration: 2.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Gran Canaria',
			capacity: 10,
			stock: 8,
			availability: true,
			category: 'deportes',
			image:
				'https://images.unsplash.com/photo-1597645587534-5b018daa754b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#70',
			name: 'Buceo en el Cabo de Gata',
			description:
				'Explora la vida marina en el parque natural submarino del Cabo de Gata.',
			userId: 'admin#1',
			price: 80,
			duration: 3.5,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Almería',
			capacity: 8,
			stock: 6,
			availability: true,
			category: 'deportes',
			image:
				'https://images.pexels.com/photos/1388513/pexels-photo-1388513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},

		// Cultural
		{
			id: 'experience#71',
			name: 'Visita al Alhambra en Granada',
			description:
				'Descubre la arquitectura única del palacio nazarí de la Alhambra.',
			userId: 'admin#1',
			price: 40,
			duration: 3.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Granada',
			capacity: 50,
			stock: 40,
			availability: true,
			category: 'cultural',
			image:
				'https://images.unsplash.com/photo-1557682954-a0454f8cb1d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#72',
			name: 'Taller de cerámica tradicional',
			description: 'Aprende a crear piezas únicas de cerámica andaluza.',
			userId: 'admin#1',
			price: 55,
			duration: 2.5,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Sevilla',
			capacity: 12,
			stock: 10,
			availability: true,
			category: 'cultural',
			image:
				'https://images.pexels.com/photos/1194195/pexels-photo-1194195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},

		// Gaming
		{
			id: 'experience#73',
			name: 'Sesión de realidad virtual',
			description:
				'Experimenta juegos inmersivos en un centro de realidad virtual.',
			userId: 'admin#1',
			price: 35,
			duration: 1.5,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Valencia',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'gaming',
			image:
				'https://images.unsplash.com/photo-1522364724200-94943f734c3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#74',
			name: 'Jornada de videojuegos retro',
			description: 'Revive tus juegos favoritos de los años 80 y 90.',
			userId: 'admin#1',
			price: 25,
			duration: 3.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Barcelona',
			capacity: 30,
			stock: 25,
			availability: true,
			category: 'gaming',
			image:
				'https://images.pexels.com/photos/356002/pexels-photo-356002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},

		// Música
		{
			id: 'experience#75',
			name: 'Concierto de música clásica en el Teatro Real',
			description:
				'Disfruta de una velada con música clásica en el icónico Teatro Real.',
			userId: 'admin#1',
			price: 60,
			duration: 2.0,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Madrid',
			capacity: 150,
			stock: 120,
			availability: true,
			category: 'musica',
			image:
				'https://images.unsplash.com/photo-1542744173-947020f897f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 'experience#76',
			name: 'Jam session en vivo',
			description:
				'Únete a una sesión de improvisación musical con artistas locales.',
			userId: 'admin#1',
			price: 20,
			duration: 2.5,
			dateFrom: new Date(),
			dateTo: new Date(),
			location: 'Bilbao',
			capacity: 50,
			stock: 40,
			availability: true,
			category: 'musica',
			image:
				'https://images.pexels.com/photos/270012/pexels-photo-270012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		// Gastronomía
		{
			id: 'experience#77',
			name: 'Taller de cocina mediterránea',
			description:
				'Aprende a preparar platos tradicionales del mar Mediterráneo.',
			price: 85,
			duration: 3.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Málaga',
			capacity: 15,
			stock: 12,
			availability: true,
			category: 'gastronomia',
			image:
				'https://images.unsplash.com/photo-1560487489-0926f7b94a4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#78',
			name: 'Degustación de aceite de oliva virgen extra',
			description: 'Descubre los mejores aceites de oliva de Andalucía.',
			price: 50,
			duration: 1.5,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Jaén',
			capacity: 25,
			stock: 20,
			availability: true,
			category: 'gastronomia',
			image:
				'https://images.pexels.com/photos/109272/pexels-photo-109272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Relax
		{
			id: 'experience#79',
			name: 'Sesión de aromaterapia',
			description: 'Relájate con una sesión de aromaterapia personalizada.',
			price: 60,
			duration: 1.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Valencia',
			capacity: 10,
			stock: 8,
			availability: true,
			category: 'relax',
			image:
				'https://images.unsplash.com/photo-1523275335684-378c8e4c465b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#80',
			name: 'Meditación guiada en la montaña',
			description:
				'Conecta con la naturaleza mientras meditas en un entorno tranquilo.',
			price: 40,
			duration: 2.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Soria',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'relax',
			image:
				'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Aire Libre
		{
			id: 'experience#81',
			name: 'Ruta en bicicleta por el Camino de Santiago',
			description:
				'Explora uno de los caminos más famosos del mundo en bicicleta.',
			price: 70,
			duration: 4.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Galicia',
			capacity: 12,
			stock: 10,
			availability: true,
			category: 'aire libre',
			image:
				'https://images.unsplash.com/photo-1509630049375-64c3de919cbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#82',
			name: 'Observación de aves en Doñana',
			description:
				'Disfruta de la biodiversidad única del Parque Nacional de Doñana.',
			price: 55,
			duration: 3.5,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Huelva',
			capacity: 10,
			stock: 8,
			availability: true,
			category: 'aire libre',
			image:
				'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Deportes
		{
			id: 'experience#83',
			name: 'Clase de paddle surf en Ibiza',
			description: 'Aprende a navegar sobre las aguas cristalinas de Ibiza.',
			price: 65,
			duration: 2.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Ibiza',
			capacity: 15,
			stock: 12,
			availability: true,
			category: 'deportes',
			image:
				'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#84',
			name: 'Partido de baloncesto profesional',
			description: 'Vive la emoción de un partido de baloncesto en vivo.',
			price: 45,
			duration: 2.5,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Madrid',
			capacity: 15000,
			stock: 1000,
			availability: true,
			category: 'deportes',
			image:
				'https://images.unsplash.com/photo-1589334434630-1b0c9f6041a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Cultural
		{
			id: 'experience#85',
			name: 'Visita al Alcázar de Sevilla',
			description: 'Admira la arquitectura mudéjar del Alcázar de Sevilla.',
			price: 35,
			duration: 2.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Sevilla',
			capacity: 50,
			stock: 40,
			availability: true,
			category: 'cultural',
			image:
				'https://images.unsplash.com/photo-1557682954-a0454f8cb1d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#86',
			name: 'Taller de pintura al óleo',
			description:
				'Exprésate a través de la pintura con técnicas tradicionales.',
			price: 70,
			duration: 3.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Bilbao',
			capacity: 10,
			stock: 8,
			availability: true,
			category: 'cultural',
			image:
				'https://images.pexels.com/photos/1194195/pexels-photo-1194195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Gaming
		{
			id: 'experience#87',
			name: 'Clase de diseño de videojuegos',
			description: 'Aprende a crear tus propios videojuegos desde cero.',
			price: 90,
			duration: 4.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Barcelona',
			capacity: 20,
			stock: 15,
			availability: true,
			category: 'gaming',
			image:
				'https://images.unsplash.com/photo-1522364724200-94943f734c3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#88',
			name: 'Noche de juegos de mesa',
			description:
				'Disfruta de una noche divertida con juegos de mesa clásicos.',
			price: 25,
			duration: 3.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Zaragoza',
			capacity: 30,
			stock: 25,
			availability: true,
			category: 'gaming',
			image:
				'https://images.pexels.com/photos/356003/pexels-photo-356003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},

		// Música
		{
			id: 'experience#89',
			name: 'Concierto de música clásica al aire libre',
			description:
				'Disfruta de un concierto de música clásica en un entorno natural.',
			price: 50,
			duration: 2.5,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'San Sebastián',
			capacity: 200,
			stock: 150,
			availability: true,
			category: 'musica',
			image:
				'https://images.unsplash.com/photo-1542744173-947020f897f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		},
		{
			id: 'experience#90',
			name: 'Jam session de rock',
			description: 'Únete a una improvisación musical con músicos locales.',
			price: 30,
			duration: 2.0,
			dateTo: new Date(),
			dateFrom: new Date(),
			location: 'Valencia',
			capacity: 30,
			stock: 25,
			availability: true,
			category: 'musica',
			image:
				'https://images.pexels.com/photos/270012/pexels-photo-270012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			userId: 'admin#1',
			createdAt: new Date(),
			updatedAt: null
		}
	];

	for (const experience of experiences) {
		await ExperienceModel.upsert(experience);
	}
}

module.exports = fillDB;

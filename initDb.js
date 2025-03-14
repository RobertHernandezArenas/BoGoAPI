require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('./db');
const args = process.argv;

const addData = args[2] === '--data';

async function main() {
	// Get reference to db
	const connection = await getConnection();

	console.log('Dropping tables...');
	await connection.query('DROP TABLE IF EXISTS incidents');
	await connection.query('DROP TABLE IF EXISTS comunidades');
	await connection.query('DROP TABLE IF EXISTS reserves');
	await connection.query('DROP TABLE IF EXISTS ratings');
	await connection.query('DROP TABLE IF EXISTS spaces');
	await connection.query('DROP TABLE IF EXISTS users');

	console.log('Creating new tables...');

	await connection.query(`
   create table users (
      id int unsigned primary key auto_increment,
      name varchar(100)not null,
      email varchar(60) not null unique,
      password varchar(255) not null,
      city varchar(50) default null,
      community varchar(50) default null,
      avatar varchar(255) default null,
      phone varchar(15) default null,
      is_owner bool default false,
      role enum("normal","admin") default "normal" not null,
      active bool default false not null,
      registrationCode varchar(255),
      lastPasswordUpdate datetime not null,
      create_user timestamp default current_timestamp,
      update_user timestamp default current_timestamp on update current_timestamp);
   `);

	await connection.query(`
   create table spaces (
      id int unsigned primary key auto_increment,
      name varchar(30)not null,
      city varchar(60) not null,
      community varchar(60) not null,
      adress varchar(255) not null,
      photo1 varchar(255) default null,
      photo2 varchar(255) default null,
      photo3 varchar(255) default null,
      type varchar(40) not null,
      price decimal(10,2) not null,
      description text not null,
      equipment text not null,
      owner_id int unsigned not null,
      create_space timestamp default current_timestamp,
      update_space timestamp default current_timestamp on update current_timestamp,
      constraint fk_spaces_users_id foreign key (owner_id) references users(id)) ;
   `);

	await connection.query(`
    create table reserves (
      id int unsigned primary key auto_increment,
      payment_date date default null,
      start_date date not null,
      end_date date not null,
      is_paid bool default false not null,
      is_clean bool default false not null,
      is_confirmed bool default false not null,
      confirmationCode varchar(255),
      paymentCode varchar(255),
      user_id int unsigned not null,
      space_id int unsigned not null ,
      constraint fk_reserves_users_id foreign key (user_id) references users(id) ,
      constraint fk_reserves_spaces_id foreign key (space_id) references spaces(id));
   `);

	await connection.query(`
   create table incidents (
      id int unsigned primary key auto_increment,
      comment text default null,
      state enum ("open","close") default "open",
      reserve_id int unsigned not null,
      create_incident timestamp default current_timestamp,
      update_incident timestamp default current_timestamp on update current_timestamp,
      constraint fk_incidents_reserves foreign key (reserve_id) references reserves(id));
   `);

	await connection.query(`
   create table ratings (
      id int unsigned primary key auto_increment,
      score int(5) not null,
      comment text default null,
      user_id int unsigned not null ,
      space_id int unsigned not null,
      create_rating timestamp default current_timestamp,
      update_rating timestamp default current_timestamp on update current_timestamp,
      constraint fk_ratings_users_id foreign key (user_id) references users(id) ,
      constraint fk_ratings_spaces_id foreign key (space_id) references spaces(id)) ;
   `);
	await connection.query(`
  CREATE TABLE comunidades (
  id_comunidad tinyint(4) NOT NULL,
  nombre varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);

	// Create initial user
	const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

	await connection.query(`
        INSERT INTO users(lastPasswordUpdate, email, password, role, name, active,city,community,phone,avatar)
        VALUES( UTC_TIMESTAMP, "rubenpo167@gmail.com", "${password}", "admin", "Rubén Pérez", true,"Noia","Galicia","639063381","me.jpeg")
      `);

	if (addData) {
		console.log('Adding initial data...');

		const passwordRandomUsers = await bcrypt.hash(
			process.env.DEFAULT_PASSWORD,
			10
		);

		await connection.query(`
      insert into users (id, name,  email, password, city, community, phone,is_owner,active,lastPasswordUpdate,avatar) values 
      (2, 'Uriel Hellsdon', 'rubenpo167+user2@gmail.com', '${passwordRandomUsers}', 'Telde', 'Canarias', '6622954423',true,true,UTC_TIMESTAMP,"user2.jpg"),
      (3, 'Benjamin Mellodey',  'rubenpo167+user3@gmail.com', '${passwordRandomUsers}', 'Santiago De Compostela', 'Galicia', '7736800054',false,true,UTC_TIMESTAMP,"user3.jpg"),
      (4, 'Rhiamon Custed',  'rubenpo167+user4@gmail.com', '${passwordRandomUsers}', 'Ourense', 'Galicia', '2318408230',false,true,UTC_TIMESTAMP,"user4.jpg"),
      (5, 'Chrissy Gemlett', 'rubenpo167+user5@gmail.com', '${passwordRandomUsers}', 'Valladolid', 'Castilla - Leon', '1004079953',false,true,UTC_TIMESTAMP,"user5.png"),
      (6, 'Biddie Reddihough',  'rubenpo167+user6@gmail.com', '${passwordRandomUsers}', 'Palmas De Gran Canaria, Las', 'Canarias', '3716413790',false,true,UTC_TIMESTAMP,"user6.jpg"),
      (7, 'Hurley Atcheson',  'rubenpo167+user7@gmail.com', '${passwordRandomUsers}', 'Palma De Mallorca', 'Baleares', '1574598212',false,true,UTC_TIMESTAMP,"user7.jpeg"),
      (8, 'Robbie Fouracre',  'rubenpo167+user8@gmail.com', '${passwordRandomUsers}', 'Palmas De Gran Canaria, Las', 'Canarias', '3224362934',false,true,UTC_TIMESTAMP,null),
      (9, 'Bobette Dunaway', 'rubenpo167+user9@gmail.com', '${passwordRandomUsers}', 'Huesca', 'Aragon', '2804685614',false,true,UTC_TIMESTAMP,null),
      (10, 'Carson Killford', 'rubenpo167+user10@gmail.com', '${passwordRandomUsers}', 'Albacete', 'Castilla - La Mancha', '4984652382',false,true,UTC_TIMESTAMP,null);
      `);

		await connection.query(`
    insert into spaces (id, name, city, community, adress, type, price,  description, owner_id,equipment,photo1) values
    (1, 'Zamit', 'Palmas De Gran Canaria, Las', 'Canarias', 'Avenida de Las Canteras 43', 'Puesto trabajo', 200,  'Este es el espacio de trabajo ideal si estás buscando algo sencillo pero eficiente, ya que tiene todo el material necesario para realizar tu trabajo de forma cómoda. Es una sala amplía en al que hay 10 puestos individuales de trabajo para personas que no quieran reservar una oficina entera', 2,'silla, escritorio, monitores, internet(300MB), impresora','space1.jpeg'),
    (2, 'Blue office', 'Barcelona', 'Cataluña', 'Carrer de la Princesa 7', 'Oficina', 2100, 'Un espacio amplio, diáfano y domotizado, inundado por luz natural, con capacidad para 20 puestos de trabajo, con zona de reprografía y zonas de descanso y de reunión de libre uso. Además, es eficiente y sostenible; planteado para mejorar la eficiencia energética y la correcta gestión de residuos. Los puestos de trabajo están equipados con mobiliario ergonómico y de diseño con separaciones independientes y cuidados hasta el último detalle, es el espacio perfecto para un equipo de trabajo.', 2,'sillas, escritorios, monitores, internet(300MB), impresoras, taquillas','space2.jpeg'),
    (3, 'La paz', 'Vigo', 'Galicia', 'Av de la Florida 11', 'Sala fotografíca', 49.99,  'Esta sala es ideal para realizar sesiones de fotos, o cualquier otro proyecto. Tiene instrumentos necesarios para realizar las mejores imágenes. ', 3,'sillas, fondos, ventanas de luz, tripodes, pantallas, camára','space3.jpeg'),
    (4, 'Meetings', 'Pontevedra', 'Galicia', 'Calle de la Peregrina 5', 'Sala', 120,  'Esta espacio es una sala ideal para realizar reuniones,exponer proyectos o realizar eventos de otro tipo. Cuenta con 20 butacas que las podemos colocar en función de su necesidad, ya sea para una reunion(con una mesa central y coladas alredeor las butacas) a una exposición (colocadas por filas para ver la pantalla).', 4,'butacas, proyectores, mesas, pantallas','space4.jpeg');
    `);

		await connection.query(`
    insert into ratings (score, comment,user_id,space_id) values 
    (4, "me gusta la iluminacion",2,1),
    (5, "me gusta encanta",3,1),
    (4, "me gusta mucho este espacio",4,1),
    (1, "no me convence",5,1),

    (1, "no me gusta",2,2),
    (2, "no está mal",3,2),
    (4, "me gusta la oficina",4,2),
    (3, "recomendable",5,2),
    (1, "no es mi estilio",6,2),

    (2, "no me gusta",2,3),
    (4, "no está mal",3,3),
    (5, "me gusta la decoración",4,3),
    (3, "recomendable",5,3),
    (1, "no es mi estilio",6,3),
    
    (4, "me gusta",2,4),
    (4, "no está mal",3,4),
    (4, "butacas muy comodas",4,4),
    (3, "recomendable",5,4),
    (1, "no se ve bien",6,4);
    `);

		//Reserva de prueba
		/*   await connection.query(`
    insert into reserves (start_date,end_date,  is_paid,is_clean,user_id,space_id,is_confirmed) values ("2020-07-23", "2020-07-25", false, false,4,1,true);
    `);

    await connection.query(`
    insert into incidents (comment,reserve_id) values ("me falla el monitor",1);
    `); */

		await connection.query(`
    INSERT INTO comunidades (id_comunidad, nombre)
    VALUES
	    (1,'Andalucía'),
      (2,'Aragón'),
      (3,'Asturias, Principado de'),
      (4,'Balears, Illes'),
      (5,'Canarias'),
      (6,'Cantabria'),
      (7,'Castilla y León'),
      (8,'Castilla - La Mancha'),
      (9,'Cataluña'),
      (10,'Comunitat Valenciana'),
      (11,'Extremadura'),
      (12,'Galicia'),
      (13,'Madrid, Comunidad de'),
      (14,'Murcia, Región de'),
      (15,'Navarra, Comunidad Foral de'),
      (16,'País Vasco'),
      (17,'Rioja, La'),
      (18,'Ceuta'),
      (19,'Melilla');
`);
	}

	console.log('Initial structure created');

	connection.release();
	process.exit();
}

main();

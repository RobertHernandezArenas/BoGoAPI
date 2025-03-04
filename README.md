src/
│
├── config/                  # Configuraciones globales
│   └── database.js          # Configuración de la base de datos (Sequelize)
│
├── domain/                  # Lógica de negocio (Hexagonal Architecture)
│   ├── entities/            # Entidades del dominio
│   │   ├── UserEntity.js    # Entidad User
│   │   └── ExperienceEntity.js # Entidad Experience
│   ├── repositories/        # Interfaces de repositorios
│   │   ├── UserRepository.js
│   │   └── ExperienceRepository.js
│   └── services/            # Servicios de negocio
│       ├── UserService.js
│       └── ExperienceService.js
│
├── infrastructure/          # Implementaciones concretas
│   ├── repositories/        # Implementaciones de repositorios
│   │   ├── UserRepositorySequelize.js
│   │   └── ExperienceRepositorySequelize.js
│   └── database/            # Modelos de Sequelize
│       ├── User.js
│       └── Experience.js
│
├── interfaces/              # Capa de presentación (API, Swagger, etc.)
│   ├── controllers/         # Controladores
│   │   ├── UserController.js
│   │   └── ExperienceController.js
│   ├── middlewares/         # Middlewares
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorHandler.js  # Middleware para manejo de errores
│   ├── routes/              # Rutas
│   │   ├── userRoutes.js
│   │   └── experienceRoutes.js
│   └── swagger/            # Documentación Swagger
│       └── swagger.js
│
├── utils/                   # Utilidades
│   ├── validators/          # Validaciones con Joi
│   │   ├── userValidator.js
│   │   └── experienceValidator.js
│   └── helpers/             # Funciones auxiliares
│       └── authHelper.js
│
├── app.js                   # Punto de entrada de la aplicación
└── server.js                # Configuración del servidor
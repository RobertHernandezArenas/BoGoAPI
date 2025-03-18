import envVar from 'env-var';
import 'dotenv/config';

const { get } = envVar;

export const CONSTANTS = {
	PORT: get('PORT').required().asPortNumber(),
	HOST: get('HOST').default('localhost').asString(),
	SERVER: get('SERVER').default('https://apieverywhere.com').asString(),
	ENVIRONMENT: get('ENVIRONMENT').default('development').asString(),
	API: get('API').default('/api').asString(),
	VERSION: get('VERSION').default('v1').asString(),
	ROUTE: {
		AUTH: {
			PATH: get('AUTH_PATH').default('/auth').asString(),
			REGISTER: get('AUTH_REGISTER').default('/register').asString(),
			LOGIN: get('AUTH_LOGIN').default('/login').asString()
		}
	},
	DATABASE: {
		MYSQL: {
			ACQUIRE: get('MYSQL_POOL_ACQUIRE').default(30000).asInt(),
			DB_NAME: get('MYSQL_DATABASE').default('beils').asString(),
			DIALECT: get('MYSQL_DIALECT').default('mysql').asString(),
			HOST: get('MYSQL_HOST').default('localhost').asString(),
			IDLE: get('MYSQL_POOL_IDLE').default(10000).asInt(),
			PASSWORD: get('MYSQL_PASSWORD').default('root').asString(),
			POOL_MAX: get('MYSQL_POOL_MAX').default(5).asInt(),
			POOL_MIN: get('MYSQL_POOL_MIN').default(0).asInt(),
			PORT: get('MYSQL_PORT').default(3306).asPortNumber(),
			TIMESTAMPS: get('MYSQL_DEFINE_TIMESTAMPS').default(1).asBool(),
			TIMEZONE: get('MYSQL_TIMEZONE').default('Z').asString(),
			USERNAME: get('MYSQL_USERNAME').default('root').asString()
		},
		TABLES: {
			CATEGORY: get('CATEGORY_TABLE').default('category').asString(),
			COMPANY: get('COMPANY_TABLE').default('company').asString(),
			EXPERIENCE: get('EXPERIENCE_TABLE').default('experience').asString(),
			NEWSLETTER: get('NEWSLETTER_TABLE').default('newsletter').asString(),
			REVIEW: get('REVIEW_TABLE').default('review').asString(),
			USER: get('USER_TABLE').default('user').asString()
		}
	},
	JWT: {
		SECRET: get('JWT_SECRET').default('chachipistachi').asString(),
		DURATION: get('JWT_DURATION').default('2h').asString()
	},
	GOOGLE: {
		CLIENT_ID: get('GOOGLE_CLIENT_ID').asString(),
		CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').asString()
	},
	STRIPE: {
		SECRET_KEY_DEMO: get('STRIPE_SECRET_KEY_DEMO').asString(),
		SECRET_KEY: get('STRIPE_SECRET_KEY').asString()
	}
};

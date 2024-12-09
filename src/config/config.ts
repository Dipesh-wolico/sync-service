import Joi from 'joi';
import { configDotenv } from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '..', '..', '.env');
configDotenv({ path: envPath });

const envVarsSchema = Joi.object()
	.keys({
		_NODE_ENV: Joi.string()
			.valid('production', 'staging', 'development', 'test')
			.required(),
		_PORT: Joi.number().default(3000),
		// DB
		_PG_USERNAME: Joi.string().min(3).required(),
		_PG_PASSWORD: Joi.string().required(),
		_PG_HOST: Joi.string().min(4).required(),
		_PG_DATABASE: Joi.string().required(),
		_PG_PORT: Joi.number().min(1).required(),
		// AUTH
		// _AUTH_CLIENT_ID: Joi.string().min(36).required(),
		// _AUTH_TENANT_ID: Joi.string().min(36).required(),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

const config = {
	env: envVars._NODE_ENV,
	port: envVars._PORT,
	db: {
		username: envVars._PG_USERNAME,
		password: envVars._PG_PASSWORD,
		host: envVars._PG_HOST,
		database: envVars._PG_DATABASE,
		port: envVars._PG_PORT,
	},
	// auth: {
	// 	clientId: envVars._AUTH_CLIENT_ID,
	// 	tenantId: envVars._AUTH_TENANT_ID,
	// },
};

export default config;

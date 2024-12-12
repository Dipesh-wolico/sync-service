import 'reflect-metadata';

import { DataSource } from 'typeorm';
import config from '../../config/config';
import * as fs from 'fs';
import * as path from 'path';
// import { SeasonPeriod } from './models/SeasonPeriod';

const loadEntities = (modelsPath: string) => {
	const entities: any[] = [];
	const files = fs.readdirSync(modelsPath);

	files.forEach((file) => {
		if (file.endsWith('.ts') || file.endsWith('.js')) {
			const entity = require(path.join(modelsPath, file));
			Object.values(entity).forEach((value) => {
				if (typeof value === 'function') {
					entities.push(value);
				}
			});
		}
	});

	return entities;
};

const entities = loadEntities(path.join(__dirname, './models'));

let envConfig = {};
if (process.env?.USE_VPC_CONNECTOR) {
	// envConfig = {
	// 	socket: 'ivory-pathway-412112:europe-west8:lega-calcio-db',
	// 	extra: {
	// 		socketPath:
	// 			'ivory-pathway-412112:europe-west8:lega-calcio-db',
	// 	},
	// };
	envConfig = { ssl: false };
} else {
	envConfig = { ssl: false };
}

const PGDataSource = new DataSource({
	...config.db,
	...envConfig,
	type: 'postgres',
	synchronize: false,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
	url: 'postgres://postgres:postgres@localhost:5432/wolico',
	// entities: ['build/modules/db/models/*{.ts,.js}'],
	entities: entities,
});

export default PGDataSource;

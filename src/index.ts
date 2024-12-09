import 'reflect-metadata';
import app from './app';
import config from './config/config';
import { PGDataSource } from './modules/db';
// import { logger } from './modules/logger';

let server: any;

PGDataSource.initialize()
	.then(() => {
		server = app.listen(config.port, () => {
			console.log(`Server listening on port: ${config.port}`);
		});
		// app.use(logMiddleware);
	})
	.catch((err: any) => {
		// logger.error(`Error during DB connection! Reason: ${err}`);
		console.error(err);
	});

// killing softly && error handling
const exitHandler = () => {
	if (server) {
		server.close(() => {
			// logger.info(`Server shut down`);
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: string) => {
	// logger.error(error);
	console.log(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	// logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});

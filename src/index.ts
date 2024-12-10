import 'reflect-metadata';
import app from './app';
import config from './config/config';
import { PGDataSource } from './modules/db';
// import { logger } from './modules/logger';
import { container } from 'tsyringe'; // Use tsyringe or your DI container
import { SynchronizationService } from './modules/database-synchronization/database-synchronization.service';

let server: any;

PGDataSource.initialize()
	.then(() => {
		// Start the HTTP server
		server = app.listen(config.port, () => {
			console.log(`Server listening on port: ${config.port}`);
		});

		// Initialize and run the SyncService
		const syncService = container.resolve(SynchronizationService);
		syncService.runSync().catch((err) => {
			console.error('Error in SyncService:', err);
		});
	})
	.catch((err: any) => {
		// logger.error(`Error during DB connection! Reason: ${err}`);
		console.error(err);
	});

// Killing softly & error handling
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

import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { RegisterRoutes } from './routes/routes';
// import { errorHandler, notFoundHandler } from './modules/errors';
import swaggerUi from 'swagger-ui-express';

const app: Express = express();

// security HTTP headers
app.use(helmet());

// cors
app.use(cors());
app.options('*', cors()); // sta da rivedere

// post / put handling
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

RegisterRoutes(app);

// swagger documentation
app.use('/api-docs', swaggerUi.serve, (_req: Request, res: Response) => {
	import('./swagger/swagger.json').then((swaggerDocument) => {
		const options = {
			swaggerOptions: {
				authAction: {
					BearerAuth: {
						name: 'BearerAuth',
						schema: {
							type: 'http',
							in: 'header',
							name: 'Authorization',
							description: '',
						},
						value: 'Bearer <token>',
					},
				},
			},
		};

		return res
			.status(200)
			.send(swaggerUi.generateHTML(swaggerDocument, options));
	});
});

// app.use(notFoundHandler);
// app.use(errorHandler);

export default app;

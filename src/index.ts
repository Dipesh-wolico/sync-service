import express from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './routes/routes';

const app = express();
app.use(bodyParser.json());

// Register TSOA-generated routes
RegisterRoutes(app);

// Error handling middleware
app.use(
	(
		err: any,

		res: express.Response
	) => {
		res.status(err.status || 500).json({
			message: err.message,
			errors: err?.fields || null,
		});
	}
);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

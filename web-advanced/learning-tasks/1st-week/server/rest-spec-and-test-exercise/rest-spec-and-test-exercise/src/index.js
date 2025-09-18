import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger-config.js';
import workoutRouter from './routes/workout.js';

const app = express();
const port = 3000;

// Set up basic JSON parsing
app.use(express.json());

// Setup swagger and make it available on /api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// TODO: setup your routers here
app.use('/workout', workoutRouter);

// Setup server, by default on port 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});

// Export app for testing purposes
export default app;
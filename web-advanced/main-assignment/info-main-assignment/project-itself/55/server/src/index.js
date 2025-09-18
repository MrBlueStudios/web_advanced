import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger-config.js';
import exampleRouter from './routes/example.js';

// Check if NODE_ENV environment variable is set, otherwise go to development mode
const nodeEnv = process.env.NODE_ENV || 'dev';
const app = express();
const port = 3000;

// Set up basic JSON parsing and CORS headers
app.use(express.json());
app.use(cors()); // TODO make sure it blocks everything except localhost port 4173 and 5173 (default Svelte ports)

// Setup swagger and make it available on /api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// TODO: setup your routers here, remove the one (and the exampleRouter code) below
app.use('/example', exampleRouter);

// Global error handler. In your code, throw an object with a status and message, and it will be caught here. We ignore one eslint call here, because next is needed.
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong!'
        });
});

// Setup server, by default on port 3000
app.listen(port, () => {
    // We allow this one console log here, because it helps us understand the server is actually running.
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
});

// Export app for testing purposes
export default app;
import express from 'express';
import cors from 'cors';
import ingredientRouter from './routes/ingredientRouter.js';
import { loggerMiddleware } from './middleware/logger.js';
import { rateLimitingMiddleware } from './middleware/limiter.js';

const app = express();

app.use(loggerMiddleware);
app.use(rateLimitingMiddleware);
app.use(express.json());
app.use(cors());
app.use('/ingredients', ingredientRouter);

export default app;

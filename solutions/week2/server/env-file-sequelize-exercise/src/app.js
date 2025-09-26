import express from 'express';
import cors from 'cors';
import ingredientRouter from './routes/ingredientRouter.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/ingredients', ingredientRouter);

export default app;

import express from 'express';
import cors from 'cors';
import ingredientRouter from './routes/ingredientRouter.js';
import {initDatabase} from "./db/database-helper.js";

// Check if NODE_ENV environment variable is set, otherwise go to development mode
const nodeEnv = process.env.NODE_ENV || 'dev';
const app = express();
const port = process.env.PORT || 3000;

// Set up basic JSON parsing and CORS headers
app.use(express.json());
app.use(cors());

// Setup routers
app.use('/ingredients', ingredientRouter);

// Setup database and start webserver
try {
    await initDatabase();
    app.listen(port, () => {
        console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
    });
} catch (err) {
    console.error("Failed to start server:", err);
}

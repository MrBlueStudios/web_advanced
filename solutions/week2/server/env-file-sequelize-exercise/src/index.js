import { fileURLToPath } from 'node:url';
import app from './app.js';
import { initDatabase } from './db/database-helper.js';

const nodeEnv = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;
const modulePath = fileURLToPath(import.meta.url);

export async function startServer() {
  await initDatabase();
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
      resolve(server);
    });
  });
}

if (process.argv[1] === modulePath) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export default app;

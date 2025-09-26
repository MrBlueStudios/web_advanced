import fs from 'node:fs';
import path from 'node:path';
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

let app;
let initDatabase;
let closeDatabase;
let Ingredient;
let resetRateLimiter;
let logFilePath;

const seedData = [
  { name: 'Onions', quantity: 3 },
  { name: 'Garlic', quantity: 2 },
];

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.DB_STORAGE = ':memory:';
  process.env.DB_LOGGING = 'false';
  process.env.SERVER_LOG_PATH = path.resolve('server-test.log');

  ({ default: app } = await import('../app.js'));
  ({ initDatabase, closeDatabase, Ingredient } = await import('../db/database-helper.js'));
  ({ resetRateLimiter } = await import('../middleware/limiter.js'));
  ({ logFilePath } = await import('../middleware/logger.js'));

  await initDatabase({ forceSync: true });
});

afterAll(async () => {
  await closeDatabase();
  if (fs.existsSync(logFilePath)) {
    fs.unlinkSync(logFilePath);
  }
});

beforeEach(async () => {
  resetRateLimiter();
  if (fs.existsSync(logFilePath)) {
    fs.unlinkSync(logFilePath);
  }
  await Ingredient.destroy({ where: {}, truncate: true, restartIdentity: true });
  await Ingredient.bulkCreate(seedData);
});

describe('Ingredient middleware and routes', () => {
  it('rejects invalid ids before reaching the controller', async () => {
    const res = await request(app).get('/ingredients/not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid id');
  });

  it('returns all ingredients', async () => {
    const res = await request(app).get('/ingredients');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(seedData.length);
  });

  it('validates request bodies via middleware', async () => {
    const res = await request(app).post('/ingredients').send({ name: 'x', quantity: 0 });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Name must contain at least 2 characters.');
  });

  it('creates a new ingredient when validation passes', async () => {
    const res = await request(app).post('/ingredients').send({ name: 'Tomatoes', quantity: 5 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Tomatoes', quantity: 5 });
  });

  it('limits clients to 10 requests per day', async () => {
    for (let i = 0; i < 10; i += 1) {
      const res = await request(app).get('/ingredients');
      expect(res.status).toBe(200);
    }

    const blocked = await request(app).get('/ingredients');
    expect(blocked.status).toBe(429);
    expect(blocked.body.error).toMatch(/too many requests/i);
  });

  it('writes entries to the access log', async () => {
    await request(app).get('/ingredients');

    expect(fs.existsSync(logFilePath)).toBe(true);
    const content = fs.readFileSync(logFilePath, 'utf8');
    expect(content).toMatch(/GET \/ingredients/);
  });
});

import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

let app;
let initDatabase;
let sequelize;
let Ingredient;
let firstIngredientId;

const seedItems = [
  { name: 'Milk', quantity: 2 },
  { name: 'Bread', quantity: 1 },
];

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.DB_STORAGE = ':memory:';
  process.env.DB_LOGGING = 'false';

  ({ default: app } = await import('../app.js'));
  ({ initDatabase, sequelize, Ingredient } = await import('../db/database-helper.js'));

  await initDatabase({ forceSync: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await Ingredient.destroy({ where: {}, truncate: true });
  await Ingredient.bulkCreate(seedItems);
  const firstIngredient = await Ingredient.findOne({ order: [['id', 'ASC']] });
  firstIngredientId = firstIngredient.id;
});

describe('Ingredient routes', () => {
  it('GET /ingredients returns all records', async () => {
    const res = await request(app).get('/ingredients');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(seedItems.length);
    expect(res.body[0]).toMatchObject({ name: 'Milk', quantity: 2 });
  });

  it('GET /ingredients/:id validates the id parameter', async () => {
    const res = await request(app).get('/ingredients/not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid id');
  });

  it('GET /ingredients/:id returns a single record', async () => {
    const res = await request(app).get(`/ingredients/${firstIngredientId}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: firstIngredientId, name: 'Milk', quantity: 2 });
  });

  it('POST /ingredients creates a new record', async () => {
    const res = await request(app).post('/ingredients').send({ name: 'Eggs', quantity: 12 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Eggs', quantity: 12 });

    const list = await request(app).get('/ingredients');
    expect(list.body).toHaveLength(seedItems.length + 1);
  });

  it('POST /ingredients validates input', async () => {
    const res = await request(app).post('/ingredients').send({ name: '', quantity: 0 });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Name is missing');
  });

  it('PUT /ingredients/:id updates an existing record', async () => {
    const res = await request(app)
      .put(`/ingredients/${firstIngredientId}`)
      .send({ name: 'Skimmed Milk', quantity: 3 });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: firstIngredientId, name: 'Skimmed Milk', quantity: 3 });
  });

  it('PUT /ingredients/:id validates payload', async () => {
    const res = await request(app)
      .put(`/ingredients/${firstIngredientId}`)
      .send({ name: '', quantity: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Name is missing');
  });

  it('DELETE /ingredients/:id removes a record', async () => {
    const res = await request(app).delete(`/ingredients/${firstIngredientId}`);

    expect(res.status).toBe(204);

    const list = await request(app).get('/ingredients');
    expect(list.body).toHaveLength(seedItems.length - 1);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { resetRoutines } from '../routes/workout.js';

const exampleRoutine = () => ({
  name: 'Full Body Blast',
  exercises: [
    { name: 'Push-ups', reps: 20 },
    { name: 'Squats', reps: 30 },
  ],
});

describe('Workout routines API', () => {
  beforeEach(() => {
    resetRoutines();
  });

  it('GET /workout returns an empty array initially', async () => {
    const res = await request(app).get('/workout');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /workout creates a new routine and returns it with an id', async () => {
    const res = await request(app).post('/workout').send(exampleRoutine());

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      name: 'Full Body Blast',
    });
    expect(Array.isArray(res.body.exercises)).toBe(true);
    expect(res.body.exercises).toHaveLength(2);
  });

  it('GET /workout lists all created routines', async () => {
    await request(app).post('/workout').send(exampleRoutine());
    const res = await request(app).get('/workout');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Full Body Blast');
  });

  it('GET /workout/:id returns the requested routine', async () => {
    await request(app).post('/workout').send(exampleRoutine());
    const res = await request(app).get('/workout/1');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe('Full Body Blast');
  });

  it('GET /workout/:id validates the id parameter', async () => {
    const res = await request(app).get('/workout/not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('POST /workout enforces unique routine names', async () => {
    await request(app).post('/workout').send(exampleRoutine());
    const duplicateRes = await request(app).post('/workout').send(exampleRoutine());

    expect(duplicateRes.status).toBe(400);
    expect(duplicateRes.body.errors).toContain('Routine name must be unique.');
  });

  it('POST /workout validates the request body', async () => {
    const res = await request(app)
      .post('/workout')
      .send({ name: 'Bad routine', exercises: [] });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Routine must contain at least one exercise.');
  });

  it('PUT /workout/:id updates an existing routine', async () => {
    await request(app).post('/workout').send(exampleRoutine());
    const updateRes = await request(app)
      .put('/workout/1')
      .send({
        name: 'Upper Body Strength',
        exercises: [
          { name: 'Bench Press', reps: 10 },
        ],
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe('Upper Body Strength');
    expect(updateRes.body.exercises).toHaveLength(1);
  });

  it('PUT /workout/:id rejects invalid updates', async () => {
    await request(app).post('/workout').send(exampleRoutine());
    const res = await request(app)
      .put('/workout/1')
      .send({ name: 'Upper Body Strength', exercises: [] });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Routine must contain at least one exercise.');
  });

  it('DELETE /workout/:id removes an existing routine', async () => {
    await request(app).post('/workout').send(exampleRoutine());
    const deleteRes = await request(app).delete('/workout/1');

    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get('/workout');
    expect(listRes.body).toEqual([]);
  });

  it('DELETE /workout/:id returns 404 when routine does not exist', async () => {
    const res = await request(app).delete('/workout/999');

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

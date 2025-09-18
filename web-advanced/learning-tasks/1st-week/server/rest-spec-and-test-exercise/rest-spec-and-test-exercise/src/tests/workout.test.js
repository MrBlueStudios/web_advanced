import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('GET /workout', () => {
  // Example of a single testcase
  it('should return all workouts', async () => {
    const res = await request(app).get('/workout');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // TODO: write tests here
});

describe('POST /workout', () => {
  // TODO: write tests here
});

describe('GET /workout/:id', () => {
  // TODO: write tests here
});

describe('PUT /workout/:id', () => {
  // TODO: write tests here
});

describe('DELETE /workout/:id', () => {
  // TODO: write tests here
});

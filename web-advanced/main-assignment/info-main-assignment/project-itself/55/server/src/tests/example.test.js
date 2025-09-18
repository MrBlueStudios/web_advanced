import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('GET /example/:id', () => {
  it('returns 200 when id=1', async () => {
    const res = await request(app).get('/example/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, value: 'Hello World' });
  });

  it('returns 404 when id != 1', async () => {
    const res = await request(app).get('/example/2');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Example not found' });
  });
});

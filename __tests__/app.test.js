import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('should add a new species using POST route', () => {
    return request(app)
      .post('/api/species')
      .send({ type: 'Monkey', extinct: false })
      .then((response) => {
        expect(response.body).toEqual({ id: expect.any(Number), type: 'Monkey', extinct: false });
      });
  });
  afterAll(() => {
    pool.end();
  });
});

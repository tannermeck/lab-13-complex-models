import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    const data = [{ type: 'Dogs', extinct: false }, { type: 'Bear', extinct: false }, { type: 'Dinosaur', extinct: true }];
    await Promise.all(
      data.map(item => {
        return request(app)
          .post('/api/species')
          .send(item);
      })
    );
  });
  beforeEach(async () => {
    const data = [{ name: 'Retriever', color: 'Yellow', species_id: 1 }, { name: 'T-rex', color: 'Brown', species_id: 3 }, { name: 'Velociraptor', color: 'Grey', species_id: 3 }];
    await Promise.all(
      data.map(item => {
        return request(app)
          .post('/api/animals')
          .send(item);
      })
    );
  });

  it('should add a new species using POST route', () => {
    return request(app)
      .post('/api/species')
      .send({ type: 'Monkey', extinct: false })
      .then((response) => {
        expect(response.body).toEqual({ id: expect.any(Number), type: 'Monkey', extinct: false });
      });
  });
  it('should return all the species using a GET route', () => {
    return request(app)
      .get('/api/species')
      .then((response) => {
        expect(response.body).toEqual([{ id: expect.any(Number), type: 'Dogs', extinct: false }, 
          { id: expect.any(Number), type: 'Bear', extinct: false }, 
          { id: expect.any(Number), type: 'Dinosaur', extinct: true }]);
      });
  });
  it('should add a new animal using a POST route', () => {
    return request(app)
      .post('/api/animals')
      .send({ name: 'Polar Bear', color: 'White', species_id: 2 })
      .then((response) => {
        expect(response.body).toEqual({ id: expect.any(Number), name: 'Polar Bear', color: 'White', species_id: 2 });
      });
  });
  it('should return an animal by its id', () => {
    return request(app)
      .get('api/animals/2')
      .then(response => {
        expect(response.body).toEqual({ id: expect.any(Number), name: 'T-rex', color: 'Brown', species_id: 3 });
      });
  });
  
  afterAll(() => {
    pool.end();
  });
});

import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await request(app)
      .post('/api/species')
      .send({ type: 'Dogs', extinct: false });
    await request(app)
      .post('/api/species')
      .send({ type: 'Bear', extinct: false });
    return request(app)
      .post('/api/species')
      .send({ type: 'Dinosaur', extinct: true });
  });

  beforeEach(async () => {
    await request(app)
      .post('/api/animals')
      .send({ name: 'Retriever', color: 'Yellow', species_id: 1 });
    await request(app)
      .post('/api/animals')
      .send({ name: 'T-rex', color: 'Brown', species_id: 3 });
    return request(app)
      .post('/api/animals')
      .send({ name: 'Velociraptor', color: 'Grey', species_id: 3 });
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
      .get('/api/animals/2')
      .then(response => {
        expect(response.body).toEqual({ id: expect.any(Number), name: 'T-rex', color: 'Brown', species_id: 3 });
      });
  });
  it('should return all animals and include their species', () => {
    return request(app)
      .get('/api/animals/categories')
      .then(response => {
        expect(response.body).toEqual([{ id: expect.any(Number), name: 'Retriever', color: 'Yellow', type: 'Dogs' },
          { id: expect.any(Number), name: 'T-rex', color: 'Brown', type: 'Dinosaur' },
          { id: expect.any(Number), name: 'Velociraptor', color: 'Grey', type: 'Dinosaur' }]);
      });
  });
  
  afterAll(() => {
    pool.end();
  });
});

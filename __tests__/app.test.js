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
  it('should update an animal using a PUT route', () => {
    return request(app)
      .put('/api/animals/1')
      .send({ name: 'Golden-Retriever', color: 'Golden-Brown', species_id: 1 })
      .then((response) => {
        expect(response.body).toEqual({ id: expect.any(Number), name: 'Golden-Retriever', color: 'Golden-Brown', species_id: 1 });
      });
  });
  it('should delete an animal with the given id', () => {
    return request(app)
      .delete('/api/animals/3')
      .then((response) => {
        expect(response.body).toEqual({ id: 3, name: 'Velociraptor', color: 'Grey', species_id: 3 });
      });
  });
  it('should return a count of animals within a given species', () => {
    return request(app)
      .get('/api/animals/species-count')
      .then((response) => {
        expect(response.body).toEqual([{ type: 'Dogs', count: '1' }, { type: 'Dinosaur', count: '2' }]);
      });
  });
  it('should update a species with a PATCH route', () => {
    return request(app)
      .patch('/api/species/3')
      .send({ extinct: false })
      .then((response) => {
        expect(response.body).toEqual({ id: 3, type: 'Dinosaur', extinct: false });
      });
  });
  it('should get all species who a non-extinct', () => {
    return request(app)
      .get('/api/species/non-extinct')
      .then((response) => {
        expect(response.body).toEqual([{ id: expect.any(Number), type: 'Dogs', extinct: false }, { id: expect.any(Number), type: 'Bear', extinct: false }]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});

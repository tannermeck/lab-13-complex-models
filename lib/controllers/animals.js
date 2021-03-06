import { Router } from 'express';
import Animal from '../models/Animal.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const newAnimal = await Animal.insert(req.body);
      res.send(newAnimal);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/categories', async (req, res, next) => {
    try {
      const animals = await Animal.getSpecies();
      res.send(animals);
    } catch (error) {
      next(error);
    }
  })
  .get('/species-count', async (req, res, next) => {
    try {
      const speciesCount = await Animal.getSpeciesCount();
      res.send(speciesCount);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animal = await Animal.getById(id);
      res.send(animal);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updateAnimal = await Animal.update(req.body, id);
      res.send(updateAnimal);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteAnimal = await Animal.delete(id);
      res.send(deleteAnimal);
    } catch (error) {
      next(error);
    }
  });

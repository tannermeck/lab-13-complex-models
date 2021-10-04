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
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const animal = await Animal.getById(id);
      res.send(animal);
    } catch (error) {
      next(error);
    }
      
  });

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
  });

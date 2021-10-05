import { Router } from 'express';
import Species from '../models/Species.js';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const newSpecies = await Species.insert(req.body);
      res.send(newSpecies);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allSpecies = await Species.getAll();
      res.send(allSpecies);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const obj = await Species.update(req.body, id);
      res.send(obj);
    } catch (error) {
      next(error);
    }
  });



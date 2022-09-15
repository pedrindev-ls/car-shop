import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import { CarZodSchema } from '../interfaces/ICar';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';

const carsRouter = Router();
const carsModel = new CarsModel();
const carsService = new CarsService(carsModel, CarZodSchema);
const carsController = new CarsController(carsService);

carsRouter.post('/', (req, res) => carsController.create(req, res));
carsRouter.get('/', (req, res) => carsController.read(req, res));
carsRouter.get('/:id', (req, res) => carsController.readOne(req, res));
carsRouter.put('/:id', (req, res) => carsController.update(req, res));
carsRouter.delete('/:id', (req, res) => carsController.delete(req, res));

export default carsRouter;
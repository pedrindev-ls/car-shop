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

export default carsRouter;
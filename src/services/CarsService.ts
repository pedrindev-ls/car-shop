import { ICar } from '../interfaces/ICar';
import MongoService from './MongoService';

export default class CarsService extends MongoService<ICar> {}

// const carsServi = new CarsService(new CarsModel(), CarZodSchema);
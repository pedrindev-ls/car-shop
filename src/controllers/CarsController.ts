import { ICar } from '../interfaces/ICar';
import MongoController from './MongoController';

export default class CarsController extends MongoController<ICar> {}
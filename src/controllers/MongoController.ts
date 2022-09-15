import { Request, Response } from 'express';
import IController from '../interfaces/IController';
import IService from '../interfaces/IService';

export default abstract class MongoController<T> implements IController {
  protected _service:IService<T>;
  constructor(service: IService<T>) {
    this._service = service;
  }

  async create(req: Request, res: Response): Promise<Response> {
    console.log(req.body);
    const item = await this._service.create(req.body);
    return res.status(201).json(item);
  }

  async read(req: Request, res: Response): Promise<Response> {
    const item = await this._service.read();
    return res.status(200).json(item);
  }

  async readOne(req: Request, res: Response): Promise<Response> {
    const item = await this._service.readOne(req.params._id);
    return res.status(200).json(item);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const item = await this._service.update(req.params._id, req.body);
    return res.status(200).json(item);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const item = await this._service.readOne(req.params._id);
    return res.status(200).json(item);
  }
}
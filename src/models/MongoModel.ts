import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;
  
  constructor(model:Model<T>) {
    this._model = model;
  }

  create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    if (!_id) throw new Error('Id invalido');
    return this._model.findById(_id);
  }

  async update(_id: string, obj: T): Promise<T | null> {
    return this._model.findByIdAndUpdate(_id, { obj });
  }

  async delete(_id: string): Promise<T | null> {
    return this._model.findByIdAndDelete(_id);
  }
}
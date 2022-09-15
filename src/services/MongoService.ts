import { ZodSchema } from 'zod';
import ErrorInterface from '../interfaces/IError';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default abstract class MongoService<T> implements IService<T> {
  protected _model:IModel<T>;
  protected _schema: ZodSchema<T>;
  constructor(model:IModel<T>, schema: ZodSchema<T>) {
    this._model = model;
    this._schema = schema;
  }

  create(obj: T): Promise<T> {
    const parsed = this._schema.safeParse(obj);

    if (!parsed.success) {
      const erro: ErrorInterface = new Error('Erro com as informações enviadas');
      erro.status = 400;
      throw erro;
    }

    return this._model.create(obj);
  }

  read(): Promise<T[]> {
    return this._model.read();
  }

  readOne(_id: string): Promise<T | null> {
    return this._model.readOne(_id);
  }

  update(_id: string, obj: T): Promise<T | null> {
    return this._model.update(_id, obj);
  }

  delete(_id: string): Promise<T | null> {
    return this._model.delete(_id);
  }
}
import { ZodSchema } from 'zod';
import ErrorInterface from '../interfaces/IError';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

const idError = 'Id must have 24 hexadecimal characters';
const rtrnError = 'Object not found';

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

  async readOne(_id: string): Promise<T | null> {
    if (_id.length < 24) {
      const erro: ErrorInterface = new Error(idError);
      erro.error = idError;
      erro.status = 400;
      throw erro;
    }
    const items = await this._model.readOne(_id);
    
    if (!items) {
      const erro: ErrorInterface = new Error(rtrnError);
      erro.error = rtrnError;
      erro.status = 404;
      throw erro;
    }
    return items;
  }

  async update(_id: string, obj: T): Promise<T | null> {
    if (_id.length < 24) {
      const erro: ErrorInterface = new Error(idError);
      erro.error = idError;
      erro.status = 400;
      throw erro;
    } else if (!this._schema.safeParse(obj).success) {
      const erro: ErrorInterface = new Error(idError);
      erro.status = 400;
      throw erro;
    }

    const item = await this._model.update(_id, obj);

    if (!this._schema.safeParse(item).success) {
      const erro: ErrorInterface = new Error(rtrnError);
      erro.error = rtrnError;
      erro.status = 404;
      throw erro;
    }

    return item;
  }

  delete(_id: string): Promise<T | null> {
    return this._model.delete(_id);
  }
}
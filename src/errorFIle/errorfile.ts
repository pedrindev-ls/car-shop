import { NextFunction, Request, Response } from 'express';
import ErrorInterface from '../interfaces/IError';

export default class TakingError {
  takeError = (err: ErrorInterface, _req: Request, res: Response, _next: NextFunction) => {
    if (err.status) return res.status(err.status).json({ message: err.message });

    console.log(err);

    res.status(500).json({ message: err.message });
  };
}
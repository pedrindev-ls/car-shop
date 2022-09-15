import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import TakingError from './errorFIle/errorfile';
import ErrorInterface from './interfaces/IError';
import carsRouter from './routes/CarsRouter';

const app = express();
const takingError = new TakingError();

app.use(express.json());
app.use('/cars', carsRouter);
app.use((err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
  takingError.takeError(err, req, res, next);
});

export default app;

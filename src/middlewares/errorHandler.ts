import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';
import { Logger } from '../logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const logger = Logger(`${err.name} @ ${__filename}`);

  // Sends an appropriate HTTP response for the CustomError exception caught
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  logger.error(err);

  // Treats every other error as a internal server exception
  res.status(500).send({
    errors: [
      {
        name: err.name,
        message: err.message || 'Something went wrong',
      },
    ],
  });
};

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import DBManager from "../db/DBManager";
import { Logger } from "../logger";

const logger = Logger('PostItController');

const {
  CREATED,
  OK
} = StatusCodes;

const countPostIts = async (
  req: Request,
  res: Response
): Promise<Response> => {  
  const next = await DBManager.postIt.count({});

  return res.status(OK).send({ next });
}

const getPostIts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const responseBody = await DBManager.postIt
    .find({})
    .sort({ updatedAt: "asc" })
    .lean();

  return res.status(OK).json(responseBody);
}

const createPostIt = async (
  req: Request,
  res: Response
): Promise<Response> => {  
  logger.info("Iniciando criação de um novo post it");

  const { body } = req;

  logger.info(`Corpo deste postIt: ${JSON.stringify(body)}`);

  const responseBody = await DBManager.postIt.create({
    to: body.to,
    from: body.from,
    text: body.text,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return res.status(CREATED).json(responseBody);
}

export { 
  countPostIts,
  createPostIt,
  getPostIts,
};

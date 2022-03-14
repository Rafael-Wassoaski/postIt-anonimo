import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import DBManager from "../db/DBManager";

export async function countPostIts(
  req: Request,
  res: Response
): Promise<Response> {
  let status = OK;
  let responseBody;

  try {
    const next = await DBManager.postIt.count({});

    responseBody = { next };
  } catch (error) {
    responseBody = error;
    status = INTERNAL_SERVER_ERROR;
  } finally {
    return res.status(status).send(responseBody);
  }
}

export async function getPostIts(
  req: Request,
  res: Response
): Promise<Response> {
  let status = OK;
  let responseBody;

  try {
    responseBody = await DBManager.postIt
      .find({})
      .sort({ updatedAt: "desc" })
      .lean();
  } catch (error) {
    responseBody = error;
    status = INTERNAL_SERVER_ERROR;
  } finally {
    return res.status(status).json(responseBody);
  }
}

export async function createPostIt(
  req: Request,
  res: Response
): Promise<Response> {
  let status = OK;
  let responseBody;

  try {
    log("Iniciando criação de um novo post it");

    const { body } = req;

    log(`Corpo deste postIt::::: ${JSON.stringify(body)}`);

    responseBody = await DBManager.postIt.create({
      to: body.to,
      from: body.from,
      text: body.text,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error: any) {
    const message =
      error.message || `erro desconhecido ao criar postIt: ${error}`;

    errorLog(message);

    responseBody = {error};
    status = INTERNAL_SERVER_ERROR;
  } finally {
    return res.status(status).json(responseBody);
  }
}

function log(message: string): void {
  console.info("Postit Controller: ", message);
}

function errorLog(message: string): void {
  console.info("Erro em Postit Controller: ", message);
}

import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import DBManager from "../db/DBManager";

export async function getPostIts(req: Request, res: Response): Promise<Response> {
  let status = OK;
  let responseBody;

  try {
    responseBody = await DBManager.postIt.find({}).sort( {updatedAt: 'desc' }).lean();
  } catch (error) {
    responseBody = error;
    status = INTERNAL_SERVER_ERROR;
  } finally {
    return res.status(status).json(responseBody);
  }
}

export async function createPostIt(req: Request, res: Response): Promise<Response>{
    let status = OK;
    let responseBody;

    try{
        const { body } = req;
        responseBody = await DBManager.postIt.create({
            to: body.to,
            from: body.from,
            text: body.text,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }catch(error){
        responseBody = error;
        status = INTERNAL_SERVER_ERROR;
    }finally{
        return  res.status(status).json(responseBody)
    }
    
}

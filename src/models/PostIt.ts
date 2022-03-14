import PostIt from "../interfaces/PostIt";
import {Connection, Model} from "mongoose";
import postIt from "../db/schemas/PostIts";


export async function createSchema(connection: Connection): Promise<Model<PostIt>>{
    return await connection.model('PostIt', postIt);
}
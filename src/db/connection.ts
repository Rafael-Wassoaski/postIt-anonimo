import mongoose from "mongoose";
import createSchema from "./schemas/PostIts";

export default class DBManager {
  private static connection: mongoose.Connection;

  constructor(){
      DBManager.connect().then(result =>{
        console.log(`Estado da conexão com o banco ${DBManager.connection.readyState}`);

        this.createModels();
      });

  }


  private static async connect(): Promise<void> {
    if (DBManager.connection) {
      return;
    }

    DBManager.connection = await mongoose.createConnection(
      `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
    );

  }

  get Manager(): mongoose.Connection {
    return DBManager.connection;
  }

  private async createModels(){
      createSchema();
  }
}

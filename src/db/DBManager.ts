import mongoose, { Model } from "mongoose";
import PostIt from "../interfaces/PostIt";
import { createSchema } from "./schemas/PostIts";
export default class DBManager {
  private static connection: mongoose.Connection;
  private static postItModel: Model<PostIt>;

  static async connect() {
    await DBManager.createConnection();
    console.log(
      `Estado da conexão com o banco ${DBManager.connection.readyState}`
    );

    await DBManager.createModels();
  }

  private static async createConnection(): Promise<void> {
    if (DBManager.connection) {
      return;
    }

    DBManager.connection = await mongoose.createConnection(
      `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
    );
  }

  static get Manager(): mongoose.Connection {
    return DBManager.connection;
  }

  static get postIt(): Model<PostIt> {
    return DBManager.postItModel;
  }

  private static async createModels() {
    DBManager.postItModel = await createSchema(DBManager.connection);
  }
}

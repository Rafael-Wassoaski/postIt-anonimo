import mongoose, { Model } from "mongoose";

import PostIt from "../interfaces/PostIt";
import { createSchema } from "../models/PostIt";
import { Logger } from "../logger";

const logger = Logger("DBManager");

const stateMsg = (connState: mongoose.ConnectionStates): string | void => {
  switch (connState) {
    case 0: // disconnected
      return 'Servidor MongoDB desconectado';
    case 1: // connecting
      return 'Conexão realizada com servidor MongoDB!';
    case 2: // connecting
      return 'Realizando conexão com servidor MongoDB...';
    case 3: // disconnecting
      return 'Desconectando servidor MongoDB';
    case 99: // uninitialized
      return 'Servidor MongoDB não inicializado';
    default:
      return;
  }
};

export default class DBManager {
  private static connection: mongoose.Connection;
  private static postItModel: Model<PostIt>;

  static async connect() {
    await DBManager.createConnection();

    this.printState();

    await DBManager.createModels();
  }

  private static async createConnection(): Promise<void> {
    if (DBManager.connection) {
      return;
    }

    const dbName = process.env.DB_NAME || 'postItAnonimo';
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const connString = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    DBManager.connection = await mongoose.createConnection(connString);

    DBManager.connection.on('connected', () => {
      this.printState();
    });

    DBManager.connection.on('error', (error) => {
      logger.error('Falha na conexão com o servidor MongoDB', error.message);
      process.kill(process.pid, 'SIGINT');
    });
  }

  static async disconnect(force?: boolean): Promise<void> {
    if (DBManager.connection !== undefined) {
      await DBManager.connection.close(force);
    }
  }

  private static printState() {
    logger.info(stateMsg(DBManager.connection.readyState));
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

export { stateMsg };

require("dotenv").config();

import 'express-async-errors';

import DBManager from "./db/DBManager";
import { app, shutdownGracefully } from "./server";
import { Logger } from './logger';

const logger = Logger("app");
const port = process.env.BACKEND_PORT || 3001;

const start = async () => {
  await DBManager.connect();

  const server = app.listen(port, () => {
    logger.info(`Aplicação /Post-It Anônimo/ iniciada na porta ${port}!`);
  });

  // Returns the unresolved promise, that receives
  // as arguments the exit code and the reason for
  // terminating the process.
  const exitHandler = shutdownGracefully(
    server,
    {
        coredump: false,
        timeout: 500
    }
  );

  // Handles uncaught exceptions, exiting with process.exit(1)
  process.on('uncaughtException', exitHandler(1, 'uncaughtException'));
  
  // Handles unhandled promise rejections, exiting with process.exit(1)
  process.on('unhandledRejection', exitHandler(1, 'unhandledRejection'));
  
  // Handles simple process termination, exiting with process.exit(0)
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
  
  // Handles process interruption, exiting with process.exit(0)
  process.on('SIGINT', exitHandler(0, 'SIGINT'));
};

start();

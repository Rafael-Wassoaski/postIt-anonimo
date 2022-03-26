require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";

import Routes from "../routes";
import { NotFoundError } from "../errors/notFoundError";
import { errorHandler } from "../middlewares";

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", Routes);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

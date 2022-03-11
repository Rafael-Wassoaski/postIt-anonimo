require("dotenv").config();
import DBManager from "./db/DBManager";
import express from "express";
import bodyParser from "body-parser";
import Routes from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

DBManager.connect().then(() => {
  app.use("/api/v1", Routes);

  app.listen(8000, () => {
    console.log("Aplicacao Post It anonimo iniciada");
  });
});

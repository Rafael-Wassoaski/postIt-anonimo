require("dotenv").config();
import DBManager from "./db/DBManager";
import express from "express";
import bodyParser from "body-parser";
import Routes from "./routes";

const app = express();
const port = process.env.BACKEND_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

DBManager.connect().then(() => {
  app.use("/api/v1", Routes);

  app.listen(port, () => {
    console.log("Aplicacao Post It anonimo iniciada na porta", port);
  });
});

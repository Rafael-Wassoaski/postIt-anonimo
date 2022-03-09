require('dotenv').config();
import DBManager from './db/connection';
import express from "express";

const app = express();
const Manager = new DBManager();

app.get("/", async (req, res, next) => {
  res.send("Opa");
});

console.log(Manager.Manager);


app.listen(8000, ()=>{
    console.log('Aplicacao Post It anonimo iniciada');
});
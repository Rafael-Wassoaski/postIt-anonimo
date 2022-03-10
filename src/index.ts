require('dotenv').config();
import DBManager from './db/connection';
import express from "express";

const app = express();
const manager = new DBManager();
DBManager.connect();

app.get("/", async (req, res, next) => {
  res.send("Opa");
});

console.log(DBManager.Manager);
DBManager.postIt.create({
  from: 'string',
    to: 'string',
    text: 'string',
    createdAt: 'string',
    updatedAt: 'string'
}).then(result=>{
  console.log('ok')
}).catch(err => {
  console.log('err', err)
})


app.listen(8000, ()=>{
    console.log('Aplicacao Post It anonimo iniciada');
});
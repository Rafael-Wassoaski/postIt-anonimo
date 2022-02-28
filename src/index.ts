import express from "express";

const app = express();

app.get("/", async (req, res, next) => {
  res.send("Opa");
});


app.listen(8000, ()=>{
    console.log('Aplicacao Post It anonimo iniciada');
});
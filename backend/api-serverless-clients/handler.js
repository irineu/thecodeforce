const serverless = require("serverless-http");
const express = require("express");
const logger = require('./utils/logger');
const morgan   = require('morgan');
const helmet = require("helmet");
const { ObjectId } = require("mongodb");
const app = express();

require('dotenv').config({ path: './.env' });
	
const { db, clients } = require("./Database");

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

/**
 * Helper
 * @param {*} statusCode
 * @param {*} message
 * @returns
 */
 const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    error: message || 'Ocorreu um erro.',
  }),
});


app.get("/", async (req, res, next) => {
  const result = await clients.find().toArray();
  return res.status(200).json(result);
});

app.post("/", async (req, res, next) => {
  clients.insertOne({ nome: req.body.nome, cpf: req.body.cpf})
  return res.status(201).json({
    message: "Criado com sucesso!",
  });
});

app.patch("/", async (req, res, next) => {
  clients.findOneAndUpdate({ _id: ObjectId(req.body.id) }, {$set: { nome: req.body.nome, cpf: req.body.cpf}}, { upsert: true } )
  return res.status(202).json({
    message: "Dados atualizados com sucesso!"
  });
});

app.delete("/", async (req, res, next) => {
  clients.deleteOne({ cpf: req.body.cpf })
  return res.status(204);
});

app.use( async (req, res, next) => {
  return res.status(404).json({
    message: "Resource not found"
  });
});

module.exports.handler = serverless(app);

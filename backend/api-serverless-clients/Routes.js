const { Router } = require('express');

const logger = require('./utils/logger');
const { ObjectId } = require("mongodb");
const { clients } = require("./Database");

const routes = Router();


/**
 * Helper
 * @param {*} statusCode
 * @param {*} message
 * @returns
 */
 const createErrorResponse = (message) => ({
    error: message || 'Ocorreu um erro.',
});



routes
  .get("/", async (req, res, next) => {
    try {
      const result = await clients.find().toArray();
      return res.status(200).json(result);
    }
    catch (error) {
      return res.status(500).json(createErrorResponse(error.message));
    }
  })
  .post("/", async (req, res, next) => {
    try {
      clients.insertOne({ nome: req.body.nome, cpf: req.body.cpf})
      return res.status(201).json({
        message: "Criado com sucesso!",
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json(createErrorResponse(error.message));
    }
  })
  .patch("/", async (req, res, next) => {
    try {
      clients.findOneAndUpdate({ _id: ObjectId(req.body.id) }, {$set: { nome: req.body.nome, cpf: req.body.cpf}}, { upsert: true } )
      return res.status(202).json({
        message: "Dados atualizados com sucesso!"
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json(createErrorResponse(error.message));
    }
  })
  .delete("/", async (req, res, next) => {
    try {
      await clients.deleteOne({ _id: ObjectId(req.body.id) })
      return res.status(204).send();
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json(createErrorResponse(error.message));
    }
  });
  
  routes.use( async (req, res, next) => {
    return res.status(404).json({
      message: "Resource not found"
    });
  });

module.exports = routes; 
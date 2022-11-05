const { params } = require("@serverless/cloud");
const { MongoClient } = require("mongodb");
const logger = require('./utils/logger');
const uri = params.MONGO_URI || process.env.MONGODB_CONNECTION_STRING;
 
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
client.connect().then(()=>{
    logger.info("Base de dados conectada!");
}).catch((error)=>{
    logger.error("Erro ao conectar"+ error);
});
 
const db = client.db("codeforce");
const clients = db.collection("clients");

module.exports = {
  clients
}

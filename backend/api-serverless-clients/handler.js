const serverless = require("serverless-http");
const express = require("express");

const morgan   = require('morgan');
const helmet = require("helmet");
const routes = require("./Routes");
const app = express();

require('dotenv').config({ path: './.env' });
	
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use(routes);

module.exports.handler = serverless(app);

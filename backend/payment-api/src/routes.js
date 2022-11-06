const { Router } = require('express');

// Middlewares
//const auth       = require('./middlewares/auth');

// Controllers
const PaymentController = require('./controllers/PaymentController');

const routes = Router();

routes.post('/card/tokenize',  PaymentController.tokenizeCard)

    
module.exports = routes; 
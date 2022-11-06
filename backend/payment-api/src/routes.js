const { Router } = require('express');

// TODO: Middlewares
// TODO: Auth
//const auth       = require('./middlewares/auth');

// Controllers
const PaymentController = require('./controllers/PaymentController');

const routes = Router();

routes.post('/card/tokenize',  PaymentController.tokenizeCard)
    .post('/card/pay', PaymentController.pay);

    
module.exports = routes; 
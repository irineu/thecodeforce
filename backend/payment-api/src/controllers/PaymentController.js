const _paymentServices = require('../services/PaymentServices');

module.exports = {
    async tokenizeCard( req , res ){
        try {
            const tokenize = await _paymentServices.tokenize(req.body);
            
            return res.status(200).json(tokenize);
        } catch (err){
            return res.status(400).json({ message: err.message});
        }
    },
    
    async pay( req , res ){
        try {
            const payment = await _paymentServices.pay(req.body);
            
            return res.status(200).json(payment);
        } catch (err){
            return res.status(400).json({ message: err.message});
        }
    }
}
    
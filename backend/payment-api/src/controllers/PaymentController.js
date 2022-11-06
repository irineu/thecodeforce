const _paymentServices = require('../services/PaymentServices');

module.exports = {
    async tokenizeCard( req , res ){
        try {
            const payment = await _paymentServices.tokenize(req.body);
            
            return res.status(200).json(payment);
        } catch (err){
            console.error(err);
            return res.status(400).json({ message: err.message});
        }
    },
}
    
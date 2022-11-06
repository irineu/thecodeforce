const logger = require('../util/Logger');
const _getnetServices = require("./GetnetServices")
const _tokenRepository = require('../repository/TokenizeRepository');

class PaymentServices {
    
    async tokenize( request ){
        
        if ( await _tokenRepository.getTokenByClientId(request.clientId) != null ){
            throw new Error("Esse usuario ja tem um cartao tokenizado");
        }
        
        const result = await _getnetServices.tokenizeCard({
            card_number: request.card_number,
            customer_id: request.clientId
        })
        
        return await _tokenRepository.createToken({...request, token: result.data.number_token })
    }
}

module.exports = new PaymentServices();
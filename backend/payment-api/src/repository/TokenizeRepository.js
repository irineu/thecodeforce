const logger = require('../util/Logger');
const Tokens = require('../models/TokenizedCards');

module.exports = {
    
    async getTokenCard(query){
        return await Tokens.find(query);
    },
    
    async getTokenByClientId( clientId ) {
        logger.info(`Getting TokenizedCard for ${clientId}`);
        return await Tokens.findOne({
            clientId,
        });
    },
    
    async createToken(token) {
        return await Tokens.create(token);
    }
}

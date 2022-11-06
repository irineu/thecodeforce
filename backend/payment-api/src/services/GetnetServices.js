const axios = require('axios');
const api = require('../api/Getnet');
const logger = require('../util/Logger');
const qs = require('querystring');

class GetnetServices {
    
    async getAuthorizationCode(){
        const data = { 'grant_type': 'client_credentials', 'scope': 'oob'};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + process.env.GETNET_OAUTH_AUTH_BASIC
            },
            auth:{
                username: process.env.GETNET_OAUTH_CLIENT_ID,
                password: process.env.GETNET_OAUTH_CLIENT_SECRET,
            },
            data: qs.stringify(data),
            url: process.env.GETNET_BASE_URL +'/auth/oauth/v2/token',
        }
        
        return axios.request(options);
    }
    
    /**
     * {
            card_number:"5155901222280001"
            customer_id:"customer_21081826"
        }
    *
     * @param {Object} data 
     */
    async tokenizeCard( req ){
        const {data} =  await this.getAuthorizationCode();
        
        return await api.post('/v1/tokens/card', req, {
            headers: { 
                Authorization: data.token_type + ' ' +  data.access_token
            },
        })
    }
    
    async paymentCredit( req ){
        logger.info(`Calling GetNet API for payment Credit Card for orderId ${req.order.order_id}`)
        const {data} =  await this.getAuthorizationCode();
        
        return await api.post('/v1/payments/credit', req, {
            headers: { 
                Authorization: data.token_type + ' ' +  data.access_token
            },
        })
    }
}

module.exports = new GetnetServices();
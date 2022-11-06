const logger = require('../util/Logger');
const addressApi = require('../api/AddressAPI');
const clientsApi = require('../api/ClientAPI');
const orderApi = require('../api/OrderAPI');

class BackendServices {
    
    async getClientInfo( clientId ){
        logger.info(`Getting client ${clientId} info...`);
        return await clientsApi.get(`/client/${clientId}`);
    }
    
    async getAddressInfo( addressId ){
        logger.info(`Getting Address ${addressId} info...`);
        return await addressApi.get(`/address/${addressId}`);
    }
    
    async getOrderData( orderId ){
        logger.info(`Getting order ${orderId} info...`);
        return await orderApi.get(`/order/${orderId}`);
    }
    
    async updateOrderStatus( order ){
        logger.info(`Updating order ${order.id} info...`);
        order.status = "PAGAMENTO REALIZADO";
        return await orderApi.patch("/order", order);
    }
    
    
}


module.exports = new BackendServices();
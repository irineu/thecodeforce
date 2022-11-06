const logger = require("../util/Logger");
const _getnetServices = require("./GetnetServices");
const _backendServices = require("./BackendService");
const _tokenRepository = require("../repository/TokenizeRepository");

class PaymentServices {
  async tokenize(request) {
    if ((await _tokenRepository.getTokenByClientId(request.clientId)) != null) {
      throw new Error("Esse usuario ja tem um cartao tokenizado");
    }

    const result = await _getnetServices.tokenizeCard({
      card_number: request.card_number,
      customer_id: request.clientId,
    });

    return await _tokenRepository.createToken({
      ...request,
      token: result.data.number_token,
    });
  }

  async pay(request) {
    if ((await _tokenRepository.getTokenByClientId("1667756896123")) == null) {
      throw new Error("Cliente nao tem cartao tokenizado");
    }

    // orderID -> busca a order com ammout
    const order = await _backendServices.getOrderData(request.orderId);
    
    // clientId -> busca info 
    const client = await _backendServices.getClientInfo(request.clientId);
    
    // endereco local
    const address = await _backendServices.getAddressInfo(client.data.addressId);
    
    // busca cartao tokenizado pelo clientId
    // TODO: Remover id 1667756896123 e buscar dinamico 
    const tokenized = await _tokenRepository.getTokenByClientId("1667756896123")  
    
    try {
      const result = await _getnetServices.paymentCredit({
        amount: (order.data.amount.toFixed(2)).toString().replace('.',''),
        credit: {
          card: {
            brand: tokenized.brand,
            cardholder_name: tokenized.cardholder_name,
            expiration_month: tokenized.expiration_month,
            expiration_year: tokenized.expiration_year,
            number_token: tokenized.token,
          },
          delayed: false,
          number_installments: 1,
          save_card_data: false,
          transaction_type: "FULL",
        },
        customer: {
          billing_address: {
            city: address.data.city,
            number: address.data.number,
            postal_code: address.data.postalCode,
            state: address.data.state,
            street: address.data.street,
          },
          customer_id: client.data.id,
          document_number: client.data.documentNumber,
          document_type: client.data.documentType,
          email: client.data.email,
          first_name: client.data.firstName,
          last_name: client.data.lastName,
          phone_number: client.data.phone,
        },
        device: {},
        order: {
          order_id: order.data.id,
        },
        seller_id: "ff8b853e-bbcd-468a-a67f-14128c193243",
        shippings: [
          {
            address: {
              city: address.data.city,
              number: address.data.number,
              postal_code: address.data.postalCode,
              state: address.data.state,
              street: address.data.street,
            },
          },
        ],
        sub_merchant: {},
      });
      
      const updateStatus = await _backendServices.updateOrderStatus(order.data);

    } catch ( err ){
      console.log(err.response.data)
      throw err;
    }
    // Muda status da order para pago
    
    return { message: 'Pagamento realizado com sucesso!'}
  }
}

module.exports = new PaymentServices();

const logger = require("../util/Logger");
const _getnetServices = require("./GetnetServices");
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
    if ((await _tokenRepository.getTokenByClientId(request.clientId)) == null) {
      throw new Error("Cliente nao tem cartao tokenizado");
    }

    // orderID -> busca a order com ammout
    // clientId -> busca info e endereco local
    // busca cartao tokenizado pelo clientId
    // seller_id:"ff8b853e-bbcd-468a-a67f-14128c193243"
    // Muda status da order para pago
    const tokenized = await _tokenRepository.getTokenByClientId(request.clientId)

    const result = await _getnetServices.paymentCredit({
      amount: "1000",
      credit: {
        card: {
          brand: tokenized.brand,
          cardholder_name: tokenized.cardholder_name,
          expiration_month: tokenized.expiration_month,
          expiration_year: tokenized.expiration_year,
          number_token:
          tokenized.token,
        },
        delayed: false,
        number_installments: 1,
        save_card_data: false,
        transaction_type: "FULL",
      },
      customer: {
        billing_address: {
          city: "Porto Alegre",
          number: "1000",
          postal_code: "90230060",
          state: "RS",
          street: "Av. Brasil",
        },
        customer_id: request.clientId,
        document_number: "12345678912",
        document_type: "CPF",
        email: "aceitei@getnet.com.br",
        first_name: "João",
        last_name: "da Silva",
        phone_number: "5551999887766",
      },
      device: {},
      order: {
        order_id: request.orderId,
      },
      seller_id: "ff8b853e-bbcd-468a-a67f-14128c193243",
      shippings: [
        {
          address: {
            city: "Porto Alegre",
            number: "1000",
            postal_code: "90230060",
            state: "RS",
            street: "Av. Brasil",
          },
        },
      ],
      sub_merchant: {},
    });

    console.log(result.data);
  }
}

module.exports = new PaymentServices();

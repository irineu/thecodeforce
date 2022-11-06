const { Schema, model } = require('mongoose');

const TokenizedCardsSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    cardholder_name:{
        type: String,
        required: true
    },
    expiration_month:{
        type: String,
        required: true
    },
    expiration_year:{
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
},
);

module.exports = model('TokenizedCards',TokenizedCardsSchema);
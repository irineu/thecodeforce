const axios = require('axios');

const BASE_URL = process.env.GETNET_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
        'api_mode':'mocked',
        'seller_id': 'ff8b853e-bbcd-468a-a67f-14128c193243 '
    }
});

module.exports = api;
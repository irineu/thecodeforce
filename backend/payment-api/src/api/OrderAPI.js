const axios = require('axios');

const BASE_URL = process.env.BACKEND_ORDER_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json'
    }
});

module.exports = api;
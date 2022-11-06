const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const {errors} = require('celebrate');
const helmet   = require('helmet');

require('dotenv').config(require('./config/envoriment'));

const app = express();

require('./config/database');

const routes = require('./routes');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use((req, res, next) => {
    res.set('X-Powered-By', 'PHP/7.1.7');
    next();
});
app.use(helmet());
app.use(routes);  
app.use(errors());

module.exports = app;
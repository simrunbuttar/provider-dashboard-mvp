const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middleware');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const patients = require('./routes/patients');

app.use('/api/patients', patients);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
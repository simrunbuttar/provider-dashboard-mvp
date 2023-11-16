const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('@hapi/joi');

const { notFound, errorHandler } = require('./middleware');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Enable CORS for a specific origin
app.use(cors());

const patients = require('./routes/patients');

app.use('/api/patients', patients);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
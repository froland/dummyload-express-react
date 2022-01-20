const express = require('express');
const path = require('path');
const logger = require('morgan');
require('./schema');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



module.exports = app;

'use strict'

var express = require('express');

var app = express();

var user_routes = require('./routes/user');


app.use('/api', user_routes);


module.exports = app;

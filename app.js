'use strict'

var express = require('express');

var app = express();

var user_routes = require('./routes/user');

var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', user_routes);


module.exports = app;

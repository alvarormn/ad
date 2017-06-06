'use sctrict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

//api.get('/findUser/:user', userController.findUser);
api.post('/findUser', userController.findUser);


module.exports = api;

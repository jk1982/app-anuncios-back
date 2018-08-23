var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../services/logger');

module.exports = function () {

    var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(morgan('combined', {
        stream: {
            write: function (mensagem) {
                logger.info(mensagem);
            }
        }
    }));

    consign()
        .include('routes')
        .then('controllers')
        .then('infra')
        .then('model')
        .into(app);

    return app;
}
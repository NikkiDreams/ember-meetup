'use strict';
import express from 'express';
var /*express = require('express'),*/
    cors = require('cors'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    debug = require('debug')('ember-meetup'),
    mongoose = require('mongoose');

var app = module.exports = express();

require('./config/main')(app);
require('./api/helpers/NotificationHelper');

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' === req.method) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin');

      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }

      res.status(200).end();
    }
    else {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    }
};

app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.options('*', cors()); // include before other routes

require('./api/routes')(app);

var dbname = app.get('dbname');
mongoose.connect('mongodb://localhost/' + dbname, {
    user : app.get('dbuser'),
    pass : app.get('dbpwd'),
});
var db = mongoose.connection;
db.on('error', debug.bind(debug, 'connection error'));
db.once('open', function(){
    debug('connected successfully to db: ' + dbname);
});

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('ember-meetup');
var mongoose = require('mongoose');

var app = module.exports = express();

require('./config/main')(app);
require('./helpers/notification.helper');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./config/routes')(app);

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

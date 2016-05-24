'use strict';
//import app from './config/server';

/* *********************************
* Title: Ember-Meetup API Server
* Description: Ember-Meetup API Server is a standalone JSONApi Service
*		to support Ember-Meetup as a standalone application. However, Ember-Meetup
* 	is designed to be used as an Embedded Ember Application or Service.
* Author: Nichole 'Nix' Shannon
* Author URL: http://nichole-shannon.us
* Repository: https://github.com/NikkiDreams/ember-meetup
* Contriubutions are Welcomed!
* License: MIT
*/
import express from 'express';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import winstonInstance from './config/winston';
//import routes from './api/routes';
import config from './config/env';
import API from 'json-api';
import APIError from './api/helpers/APIError';
//import templates from 'express-handlebars';


/* Instantiante Express APP Obj ********************************* */
const app = express();
const debug = require('debug')('ember-meetup:app.js');

/* Inclue Helper Classes */
//require('./api/helpers/NotificationHelper');

/* Require Routes */
let _index = require('./api/routes/index');
let _events = require('./api/routes/events');
let _users = require('./api/routes/users');



/* view engine setup */
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

/* Set Logger ********************************* */
// enable detailed API logging in dev env
if (config.env === 'development') {
	app.use(logger('dev'));
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(expressWinston.logger({
		winstonInstance,
		meta: true, 	// optional: log meta data about request (defaults to true)
		msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
		colorStatus: true 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	}));
	app.set('showStackError', config.env.showStackError);
  app.set('sendGridAPIKey', config.env.sendGridAPIKey);
} else if (config.env !== 'test' && config.env !== 'development') {
	// log error in winston transports except when executing test suite
	app.use(expressWinston.errorLogger({
		winstonInstance
	}));
}

/* parse body params and attache them to req.body ********************************* */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

/* uncomment after placing your favicon in /public ********************************* */
/* If you use MVC options uncomment static options */
/*
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}
*/
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.static('public', options));
//app.use(express.static('uploads'));
//app.use(express.static('files'));

/* enable CORS - Cross Origin Resource Sharing ********************************* */
let allowCrossDomain = function(req, res, next) {
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
app.options('*', cors()); // include before other routes
app.use(cors());

/* Mount Routes ********************************* */
app.use('/', _index);
app.use('/api/events', _events);
app.use('/api/users', _users);

// All other routes should redirect to the
/*
app.route('/api/*')
	.get(function(req, res) {
		res.json('app');
});
*/

/* ERROR HAndlers ********************************* */
// All undefined asset or api routes should return a 404
//app.route('/:url(api|auth|components|app|bower_components|assets)/*')
//    .get(error[404]);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.json('error', {
	    message: err.message,
	    error: {}
	  });
	});
}

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
	if (err instanceof expressValidation.ValidationError) {
		// validation error contains errors which is an array of error each containing message[]
		const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
		const error = new APIError(unifiedErrorMessage, err.status, true);
		return next(error);
	} else if (!(err instanceof APIError)) {
		const apiError = new APIError(err.message, err.status, err.isPublic);
		return next(apiError);
	}
	return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new APIError('API not found', httpStatus.NOT_FOUND);
	return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>		// eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack: config.env === 'development' ? err.stack : {}
	})
);

app.use(function(req, res, next) {
	Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});


// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.db, {
	server: {
		user: config.dbuser,
    pass: config.dbpwd,
		socketOptions: {
			keepAlive: 1 }
		}
});
mongoose.connection.on('error', () => {
	debug.bind(debug, 'connection error');
	throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.once('open', function(){
    debug('connected successfully to db: ' + config.db);
});



// listen on port config.port
app.listen(config.port, () => {
	debug(`server started on port ${config.port} (${config.env})`);
});

/* ********************************* */
/* DONE! *************************** */
/* ********************************* */

export default app

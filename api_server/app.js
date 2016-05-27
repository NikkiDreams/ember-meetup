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
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import winstonInstance from 'winston';
import logger from './config/winston';
import Color from 'colors/safe';
import config from './config/env';
import exphbs from 'express-handlebars';


/* Instantiante Express APP Obj ********************************* */
const app = express();
const debug = require('debug')('ember-meetup:app.js');

/* Inclue Helper Classes */
//require('./api/helpers/NotificationHelper');

/* Require Routes */
let _index = require('./api/routes/index');
let _events = require('./api/routes/events');
let _users = require('./api/routes/users');


/* view engine setup ********************************* */
let hbs = exphbs.create({defaultLayout: 'main', extname: '.hbs'});
app.set('views', path.join(__dirname, './mvc-app/views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.enable('view cache');

/* Set Logger ********************************* */
// enable detailed API logging in dev env
if (config.env === 'development') {
	console.log(Color.yellow('\n!WARNING:**************************************************:WARNING!\n'));
	console.log(Color.red('!WARNING!: The API server is running in development mode!'));
	console.log(Color.red('           Set NODE_ENV=production or test if this is not right.'));
	console.log(Color.yellow('\n!WARNING:**************************************************:WARNING!\n\n'));
	app.set('showStackError', config.env.showStackError);
  app.set('sendGridAPIKey', config.env.sendGridAPIKey);
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(expressWinston.logger({ winstonInstance }));
	logger.log('silly', "127.0.0.1 - there's no place like home");
}
else if (config.env !== 'test' && config.env !== 'development') {
	// log error in winston transports except when executing test suite
	app.use(expressWinston.logger({ winstonInstance }));
	logger.log('info', "127.0.0.1 - there's no place like home");
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
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'jpg', 'png', 'gif'],
  index: false,
  maxAge: '1h',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public', options));
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

app.use((req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
});

/* Mount Routes ********************************* */
app.use('/', _index);
app.use('/api/events', _events);
app.use('/api/users', _users);

// All other routes should redirect to the
/*
app.route('/api/*')
	.get(function(req, res) {
		res.status(status).json('app');
});
*/

/* ERROR HAndlers ********************************* */
// All undefined asset or api routes should return a 404
//app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(error[404]);
// catch 404 and forward to error handler


app.use(function(err, req, res, next) {
	res.status(err.status || 500).json('error', {
		data: {
			message: 'Dev Environment ERROR: ' + err.message,
			error: err
		}
	}).end();
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

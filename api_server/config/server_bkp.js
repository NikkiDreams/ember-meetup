'use strict';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import winstonInstance from './winston';
//import routes from '../api/routes';
import config from './env';
import API from 'json-api';
import APIError from '../api/helpers/APIError';

const app = express();

if (config.env === 'development') {
	app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// enable CORS - Cross Origin Resource Sharing
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

// enable detailed API logging in dev env
if (config.env === 'development') {
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
}

app.get('/api', function(req,res){
		Event.count({}, function(err, count){
				if (err) res.status(500);
				res.send('<h2>Count'+numeral(count).format('0,0')+"</h2>");
		});
});

// All undefined asset or api routes should return a 404
//app.route('/:url(api|auth|components|app|bower_components|assets)/*')
//    .get(error[404]);

// All other routes should redirect to the
app.route('/api/*')
.get(function(req, res) {
		res.render('app');
});

if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
				res.status(err.status || 500);
				res.render('error.ejs', {
						message: err.message,
						error: err
				});
		});
}

//let Notifications = require('../api/helpers/NotificationHelper');

// mount all routes on /api path
app.use('/api', '../api/routes')(app);
//require('../api/routes/index.js')(app);

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

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
	app.use(expressWinston.errorLogger({
		winstonInstance
	}));
}

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


export default app;

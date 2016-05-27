'use strict';
import winston from 'winston';
import config from './env';
import Color from 'colors/safe';

// set theme
Color.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

const colors = {
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
};
winston.cli();
winston.addColors(colors);
const logger = new (winston.Logger)({
	level: config.log.level,
	transports: [
		new winston.transports.Console({
			json: config.log.json,
			colorize: config.log.colorize,
			handleExceptions: config.log.handleExceptions,
      humanReadableUnhandledException: config.log.humanReadableUnhandledException,
			level: config.log.level
		}),
		new (winston.transports.File)({
			filename: config.log.logfile,
			handleExceptions: config.log.handleExceptions,
    	humanReadableUnhandledException: config.log.humanReadableUnhandledException,
			level: config.log.level
		})
	],
	timestamp: config.log.timestamp,
	showStack: config.log.showStackError,
	colorStatus: config.log.colorStatus, 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	expressFormat: config.log.expressFormat,
	meta: config.log.meta, 	// optional: log meta data about request (defaults to true)
	msg: Color.blue('HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'),
	ignoreRoute: (req, res) => { return false; } // optional: allows to skip some log messages based on request and/or response
});

logger.cli();
logger.on('error', function (err) {
	console.log("Some Unknown error occured. ", err);
});
logger.log('silly', "127.0.0.1 - there's no place like home");


export default logger;

'use strict';
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

export default {
	env: 'development',
	port: 3000,
	db: 'mongodb://localhost:27017/sched1', // MongoDB database name
	dbuser: '', // MongoDB user name
	dbpwd: '', // MongoDB user password
	sendGridAPIKey: '', // https://sendgrid.com
	siteUrl: 'http://localhost', // Used for creating an absolute URL
	absoluteUrl: 'http://localhost:3000/',
	log:{
		json: false,
		level: 'silly',
		colorize: true,
		colorStatus: true,
		timestamp: true,
		logfile: '/www/emberDev/ember-meetup/debug.log',
		showStack: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
		meta: false,
		expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
		ignoreRoute: (req, res)=> { return false; } // optional: allows to skip some log messages based on request and/or response
	},
	function(path){
		console.log(Color.green(path), this.siteUrl);
		return Color.green(this.siteUrl) + ':' + Color.blue(this.port) + '/' + path;
	}
};

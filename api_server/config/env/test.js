export default {
	env: 'test',
	db: 'mongodb://localhost/express-mongoose-es6-rest-api-test',
	port: 3000,
	dbuser: '', // MongoDB user name
	dbpwd: '', // MongoDB user password
	sendGridAPIKey: '', // https://sendgrid.com
	siteUrl: '', // Used for creating an absolute URL
	absoluteUrl: function(path){
			return app.get('siteUrl') + ':' + app.get('port') + '/' + path;
	},

	showStackError: true
};

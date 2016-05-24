export default {
	env: 'development',
	port: 3000,
	db: 'mongodb://localhost:27017/sched1', // MongoDB database name
	dbuser: '', // MongoDB user name
	dbpwd: '', // MongoDB user password
	sendGridAPIKey: '', // https://sendgrid.com
	siteUrl: 'http://localhost', // Used for creating an absolute URL
	absoluteUrl: 'http://localhost:3000/',
	/*function(path){
		console.log(path, this.siteUrl);
			return this.siteUrl + ':' + this.port + '/' + path;
	},*/

	showStackError: true
};

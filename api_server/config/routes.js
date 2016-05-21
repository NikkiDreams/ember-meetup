'use strict'
var Models = require('../api/models/all-models'),
    API = require('json-api'),
    APIError = API.types.Error,
    numeral = require('numeral'),
    mongoose = require('mongoose');

var adapter = new API.dbAdapters.Mongoose(Models);
var registry = new API.ResourceTypeRegistry({
    "event": {
      urlTemplates: {
        "self": "/event/{id}"
      },
      beforeRender: function(resource, req, res) {
        //if(!userIsAdmin(req)) resource.removeAttr("password");
        return resource;
      }
    }
  }, {
    "dbAdapter": adapter
});

// Initialize the automatic documentation.
var DocsController = new API.controllers.Documentation(registry, {name: 'Example API'});

// Set up our controllers
var APIController = new API.controllers.API(registry);
var Front = new API.httpStrategies.Express(APIController, DocsController);
var requestHandler = Front.apiRequest.bind(Front);

module.exports = function(app) {

    app.get('/api', function(req,res){
        Event.count({}, function(err, count){
            if (err) res.status(500);
            res.send('<h2>Count'+numeral(count).format('0,0')+"</h2>");
        });
    });

    app.use('/api/events', require('../api/'));
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

    app.use(function(req, res, next) {
      Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
    });
};

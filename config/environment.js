/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-meetup',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiNamespace: "",
    apiHost: "http://localhost:3000",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      /*
      emberModalDialog: {
        modalRootElementId: 'modal-overlays'
      }
      */
      babel: {
        includePolyfill: true,
        only: "../api_server",
        comments: false
      }

    },
    moment: {
      allowEmpty: true // default: false
    }
  };

  ENV['ember-cli-toggle'] = {
    includedThemes: ['ios', 'flip'],
    defaultShowLabels: false, // defaults to false
    defaultTheme: 'flip',   // defaults to 'default'
    defaultSize: 'small',    // defaults to 'medium'
    defaultOffLabel: 'Off',     // defaults to 'Off'
    defaultOnLabel: 'On'        // defaults to 'On'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};

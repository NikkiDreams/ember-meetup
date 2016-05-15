import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend({
  //authorizer:             'authorizer:oauth2',
  namespace:              config.apiNamespace || 'api/v1',
  host:                   config.apiHost || 'https://api.5movez.com',
  useCSRF:                true,
  coalesceFindRequests:   true
  /*,
  headers:                Ember.computed('session.data.authenticated.data.token', function() {
                            return {
                              //"Access-Control-Allow-Headers": "Authorization, x-requested-with, Content-Type, origin, pragma, referer, user-agent, authorization, accept, client-security-token",
                              "Authorization": "Bearer "+this.get('session.data.authenticated.data.token')
                            };
                          })
                          */
});

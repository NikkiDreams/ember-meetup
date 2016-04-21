import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('events', function() {
    this.route('new');
    this.route('deleted');
    this.route('edit', { path: '/edit/:id' });
    this.route('created');
    this.route('success');
    this.route('active', { path: '/active/:id' });
    this.route('delete', { path: '/delete/:id/code/:code' });
    this.route('verify', { path: '/verify/:id/code/:code' });
    this.route('notfound');
    this.route('event');
  });

  this.route('page-not-found', { path: '/*wildcard' });
});

export default Router;

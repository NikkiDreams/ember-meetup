import Ember from 'ember';

const {
  Route,
  computed,
  inject,
  set,
  get
} = Ember;

export default Ember.Route.extend({

  editEvent(){
      this.transitionTo('events.edit', { path: '/event/:_id/edit/'});
  }

});

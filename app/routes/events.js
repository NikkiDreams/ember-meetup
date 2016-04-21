import Ember from 'ember';

const {
  Route,
  computed,
  inject,
  set,
  get
} = Ember;

export default Ember.Route.extend({
  title: null,
  eventUrl: null,
  absolute: false,
  isClosed: false,
  params: null,

  model(params){
    let record = (params._id)? this.store.findRecord('events', params._id) : {};
    this.set('params', params);
    return record;
  },

  // Get Event or redirect accordignly
  redirect(model, transition) {
    if (model.data && this.get('params._id')) {
      //Communicator.trigger('view:event', data);
      this.set('title', title);
      this.transitionTo('events.event', { path: params._id});
    }
    else if(model.data && model.data.isDeleted){
      this.transitionTo('events.deleted');
    }
    else if(this.get('params._id') && !model.data){
      this.transitionTo('events.notfound');
    }
  }


  /*

  .factory('Event', function($resource){
      return $resource('/api/event/:id', { id : '@_id' }, {
          'update' : { method : 'PUT' },
          'verify' : { method : 'GET', url : '/api/event/:id/code/:code' },
          'destroy': { method : 'DELETE', url: '/api/event/:id/code/:code' }
      });
  })
  .factory('Participant', function($resource){
      return $resource('/api/event/:id/participant/:pid', { id: '@_id'}, {
          'update' : { method : 'PUT' }
      });
  })
  .factory('Comment', function($resource){
      return $resource('/api/event/:id/comment/:cid', { id : '@_id' }, {
          'update' : { method : 'PUT' }
      })
  })
  .factory('Title', function(){
      return {
          set : function(title){
              document.title = title;
          }
      }
  }

  */
});

import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.createRecord('events', {
      creator: this.store.createRecord('creators'),
      dates: [this.store.createRecord('date')],
      emails: [this.store.createRecord('email')],
      comments: [this.store.createRecord('comment')],
      participants: [this.store.createRecord('participant',{
        votes: [this.store.createRecord('vote')] 
      })],
      __private: this.store.createRecord('code')
    });
  },

  /*model(){
    return Ember.RSVP.hash({
      creator: this.modelFor('creator'),
      event: this.modelFor('events'),
      code: this.modelFor('codes'),
      dates: this.modelFor('date')
    });
  },*/

  actions:{
      submit(){
      //console.log("Submit New Event");
    }
  }

});

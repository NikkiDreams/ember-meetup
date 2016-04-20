import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return { scope: {}};
  },

  actions:{
      submit(){
      //console.log("Submit New Event");
    }
  }

});

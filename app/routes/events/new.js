import Ember from 'ember';
import moment from 'moment';

const {
  Route,
  computed,
  inject,
  set,
  get
} = Ember;

export default Ember.Route.extend({
  moment: Ember.inject.service(),

  event: {},
  eventTitle : "Schedule a New Event",
  eventDescription : "Fill in the form below to create your event and share it with your friends and colleagues.",
  eventCreator : null,
  allowNotifications : true,

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

  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    this.controllerFor('application').set('event', "new");
    controller.set('model', model);
    controller.set('event', {});
    controller.set('eventTitle', this.get('eventTitle'));
    controller.set('eventDescription', this.get('eventDescription'));
    controller.set('eventCreator', this.get('eventCreator'));
    controller.set('allowNotifications', this.get('allowNotifications'));
  },

  submit(e){
    Ember.Logger.debug("Submit New Event", e);
      if (newEventForm.valid){
          let newEvent = new Event(event);
          newEvent.save()
          .then(function(event){
              this.set('event', event);
              this.get('event._id');

              //Communicator.trigger('add:event', event);
              this.get('state').go('newevent.success');
          }, () =>{
              let modal = new ConfirmModal({
                  title : 'Uh oh!',
                  message : 'There was an error creating your event. Please try again later.',
                  cancelText : 'OK'
              });
          });
      } else {
          let notification = new Notification({
              title : 'Hold on!',
              message : 'Make sure you fill in all the required fields and that your data is correct.'
          });
      }
  },

  actions:{
    submit(e){
      this.submit(e);
    }
  }

});

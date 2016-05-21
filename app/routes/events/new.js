import Ember from 'ember';
import moment from 'moment';
import {uuid} from 'ember-cli-uuid';

const {
  Route,
  computed,
  inject,
  set,
  get
} = Ember;

export default Ember.Route.extend({
  moment: Ember.inject.service(),
  store: Ember.inject.service(),

  isShowingModal: false,

  eventId: uuid(),

  eventHeading : "Schedule a New Event",
  eventInstruction : "Fill in the form below to create your event and share it with your friends and colleagues.",
  participantList: [
    {
      name: 'Nix Shannon',
      email: 'nix@nox.com'
    },
    {
      name: 'BooBoo Bunny',
      email: 'me@u.com'
    },
    {
      name: '',
      email: 'us@there.com'
    },
    {
      name: '',
      email: 'what@who.com'
    }
  ],

  model(params) {
    return this.store.createRecord('event', {
      id:           this.get('eventId'),
      description:  '5 Movez Workouts',
      location:     'Online @ 5movez.com',
      title:        'Access Workout',
      created:      new Date(),
      updated:      new Date(),
      comments:     [/*this.store.createRecord('comment')*/],
      creator:       this.store.createRecord('creator',{allowNotifications:true}),
      dates:        [/*this.store.createRecord('date')*/],
      participants: [/*this.store.createRecord('participant')*/],
      isOpenPoll:   false,
      isDeleted:    false,
      isNotified:   true,
      __private:    [/*this.store.createRecord('code')*/]
    });
  },

  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    //controller.setProperties(model);
    controller.set("model", model);
    this.controllerFor('application').set('event', {new: true, id:this.get('eventId')});
    controller.set('eventHeading', this.get('eventHeading'));
    controller.set('eventInstruction', this.get('eventInstruction'));
    controller.set('participantList', this.get('participantList'));
  },


  submit(e){
    //Ember.Logger.debug("Submit New Event", this.controllerFor('events.new').get('model'));
      this.controllerFor('events.new').get('model')
        .save().then((result) => {
          // Success callback
          Ember.Logger.error('SAVE SUCCESS', result);
        }, (err) =>{
          // Error callback
          Ember.Logger.error('SAVE FAILED', err);
        });
  },

  actions:{
    submit(e){
      this.submit(e);
    },

    toggleModal() {
      this.toggleProperty('isShowingModal');
    }
  }

});

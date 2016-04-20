import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed,
  inject,
  set,
  get
} = Ember;

export default Ember.Controller.extend({
    moment: Ember.inject.service(),

    state: {},
    scope: {
      title : "Schedule a New Event",
      description : "Fill in the form below to create your event and share it with your friends and colleagues.",
      event : {
        creator : {
          allowNotifications : true
        }
      }
    },


    submit(){
        if (scope.form.valid){
            let newEvent = new Event(scope.event);
            newEvent.save()
            .then(function(event){
                this.set('scope.event', event);
                this.set('scope.eventUrl', state.href('event', {
                      id: this.get('scope.event._id')
                  }, {
                      absolute : true
                  })
                );
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
    }



});

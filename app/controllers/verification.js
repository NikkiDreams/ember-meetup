import Ember from 'ember';

export default Ember.Controller.extend({

  VerificationCtrl(Event, Notification, $state){
      Event.verify({id : $state.params.id, code :$state.params.code}, () =>{
          let notification = new Notification({
              title : 'Email Verified',
              message : 'Your email has been verified. You will now be able to receive email notifications for this event',
              type : 'success',
              timeout : 5000
          });
      }, (e) =>{
          let notification = new Notification({
              title : 'Verification Failed',
              message : 'Your verification code has expired.',
              type : 'error'
          });
      });
      $state.go('event', { id : $state.params.id }, {
          location : "replace"
      });

  }

});

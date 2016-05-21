import Ember from 'ember';

export default Ember.Controller.extend({

  EditEventCtrl($http, $state, $timeout, Event, ConfirmModal, Notification, Title){
      let id = $state.params.id;
      event = Event.get({id:id}, (data) =>{
          Title.set("Edit: " + event.title);
          master = copy(event);
      }, (e) =>{
          $state.go('notfound');
      });
      $watch('event.isDeleted', (value) =>{
          if (value){
              $state.go('deletedevent');
          }
      });
      undoChanges = () =>{
          event = copy(master);
      };
      didChange = () =>{
          return JSON.stringify(master) !== JSON.stringify(event);
      };
      didChangeDates = () =>{
          return JSON.stringify(master.dates) !== JSON.stringify(event.dates);
      };
      submit = () =>{
          if (form.$valid){
              if (didChangeDates() ){
                  let modal = new ConfirmModal({
                      title : 'Hold up!',
                      message : 'Changing the dates will reset all entries by the participants. Are you sure you want to do that?',
                      confirmText : 'Yes, I\'m sure',
                      isDestructive : true,
                      confirm(){
                          event.participants = [];
                          update();
                      }
                  });

              } else {
                  update();
              }
          } else {
              let notification = new Notification({
                  title : 'Not so fast',
                  message : 'Make sure you fill in all the required fields and try again.',
                  type : 'error'
              });
          }
      };
      let update = () =>{
          Event.update({
              id : id
          }, event,
          () =>{
              let notification = new Notification({
                  title : 'Changes Saved',
                  message : 'Your changes have been saved successfully.',
                  type : 'success'
              });
              master = copy(event);
          });
      };
  }

});

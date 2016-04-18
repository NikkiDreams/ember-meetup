import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs){
      scope.deleteEvent = () =>{
          let modal = new ConfirmModal({
              title : 'Are you sure?',
              message : 'The event will no longer be accessible after it is deleted. Are you sure you want to continue?',
              isDestructive : true,
              confirmText : 'Yes - delete',
              cancelText : 'Cancel',
              confirm(){
                  Event.delete({'id' : scope.event._id}, (e) =>{
                      scope.event.isDeleted = true;
                  });
              }
          });
      };
  }

});

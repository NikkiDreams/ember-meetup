import Ember from 'ember';

const  ConfirmModal = function(options){
  return;//console.log(options);
};

export default Ember.Component.extend({
  event: null,
  isClosed: false,
  isDeleted: false,
  isNotified: false,
  toggled: false,


  statusDidChange(){
    //Ember.Logger.debug("statusDidChange",this.get('model.isClosed'));
    let status = this.get('model.isClosed');
    //open
    if(status){
      let modal = new ConfirmModal({
        title : 'Event Open',
        message : 'Participants can vote and comment on this event.',
        cancelText : 'OK'
      });
    }
    //close
    else if(status){
      let modal = new ConfirmModal({
          title : 'Event Closed',
          message : 'Participants cannot vote or comment on this event.',
          cancelText : 'OK'
      });
    }
  },

  notificationsDidChange(){
    let status = this.get('model.creator.isNotified');
    //on
    if(status){
      let modal = new ConfirmModal({
          title : 'Notifications On',
          message : 'Event participants will receive email notifications for this event.',
          cancelText : 'OK'
      });
    }
    //off
    else if(status){
      let modal = new ConfirmModal({
          title : 'Notifications Off',
          message : 'Event participants will not receive email notifications for this event.',
          cancelText : 'OK'
      });
    }
  },

  deleteEvent(){
    let status = this.get('model.isDeleted');
    let modal = new ConfirmModal({
        title : 'Are you sure?',
        message : 'The event will no longer be accessible after it is deleted. Are you sure you want to continue?',
        isDestructive : true,
        confirmText : 'Yes - delete',
        cancelText : 'Cancel',
        confirm(){
            Event.delete({'id' : scope.event._id}, (e) =>{
                event.isDeleted = true;
            });
        }
    });
  },

  actions:{
    setEventStatus(isToggled, toggleName) {
      //Ember.Logger.debug("statusDidChange",isToggled, toggleName);
      switch(toggleName) {
        case 'eventStatus': {
          this.toggleProperty('model.isClosed');
          this.statusDidChange();
          break;
        }

        case 'eventNotifications': {
          this.toggleProperty('model.creator.isNotified');
          this.notificationsDidChange();
          break;
        }

        case 'eventDelete': {
          this.toggleProperty('model.isDeleted');
          this.deleteEvent();
          break;
        }

        default: {
          // any other type..
        }
      }
    }
  }

});

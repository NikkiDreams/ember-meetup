import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  elementId: 'settingsForm',
  classNames: 'settingsForm',
  event: null,
  isClosed: true,
  isDeleted: false,
  isNotified: true,
  isShowingModal: false,

  statusDidChange(status){
    this.toggleProperty('isClosed');
    //open
    if(status){
      this.toggleProperty('isShowingModal');
      Ember.Logger.debug("statusDidChange:",status);
    }
    //close
    else if(!status){
      this.toggleProperty('isShowingModal');
      Ember.Logger.debug("statusDidChange:",status);
      /*
        message : 'Participants cannot vote or comment on this event.',
      */
    }
  },

  notificationsDidChange(status){
      this.toggleProperty('isNotified');
    //on
    if(status){
      this.toggleProperty('isShowingModal');
      Ember.Logger.debug("notificationsDidChange:",status);
      /*
        title : 'Notifications On',
        message : 'Event participants will receive email notifications for this event.',
      */
    }
    //off
    else if(!status){
      this.toggleProperty('isShowingModal');
      Ember.Logger.debug("notificationsDidChange:",status);
      /*
        title : 'Notifications Off',
        message : 'Event participants will not receive email notifications for this event.',
      */
    }
  },

  deleteEvent(){
    this.toggleProperty('isShowingModal');
    Ember.Logger.debug("deleteEvent");
    /*
        title : 'Are you sure?',
        message : 'The event will no longer be accessible after it is deleted. Are you sure you want to continue?',
        isDestructive : true,
        confirm(){
            Event.delete({'id' : scope.event._id}, (e) =>{
                event.isDeleted = true;
            });
        }
    });
    */
  },

  actions:{
    setEventStatus(hash) {
      let obj = hash.context,
          sName = obj.get('name'),
          sValue = obj.get('value');
      Ember.Logger.debug("setEventStatus", sName,sValue);
      switch(sName) {
        case 'eventStatus': {
          Ember.Logger.debug("setEventStatus", sName, sValue);
          this.statusDidChange(sValue);
          break;
        }

        case 'eventNotifications': {
          Ember.Logger.debug("statusNotificationsChange", sName, sValue);
          this.notificationsDidChange(sValue);
          break;
        }

        case 'eventDelete': {
          this.toggleProperty('isDeleted');
          this.deleteEvent();
          break;
        }

        default: {
          // any other type..
        }
      }
    },

    toggleModal() {
      this.toggleProperty('isShowingModal');
      console.log('toggleModal',this.get('isShowingModal'));
    },

    close() {
      this.toggleProperty('isShowingModal', false);
      console.log('close',this.get('isShowingModal'));
    },

    confirmModal(){
      this.toggleProperty('isConfirmed');
      console.log('confirmModal',this.get('isConfirmed'));
    }
  }

});

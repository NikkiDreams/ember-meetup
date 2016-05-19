import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  elementId: 'settingsForm',
  classNames: 'settingsForm',
  event: null,
  isOpenPoll: true,
  isDeleted: false,
  isNotified: true,
  isDestructive : false,
  isShowingPollModal: false,
  isShowingNotifyModal: false,
  isDeletedModal: false,


  statusDidChange(status){
    this.toggleProperty('isOpenPoll');
    this.toggleProperty('isShowingPollModal');
    Ember.Logger.debug("statusDidChange:",status);
  },

  notificationsDidChange(status){
      this.toggleProperty('isNotified');
      this.toggleProperty('isShowingNotifyModal');
      Ember.Logger.debug("notificationsDidChange:",status);
  },

  deleteEvent(destroy){
    this.toggleProperty('isDeletedModal');
    if(destroy){
      this.toggleProperty('isDeleted');
      Ember.Logger.debug("deleteEvent");
    }
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
          this.deleteEvent(false);
          break;
        }

        case 'eventDestroy': {
          this.deleteEvent(true);
          break;
        }

        default: {
          return;
        }
      }
    },

    close() {
      this.toggleProperty('isShowingPollModal', false);
      this.toggleProperty('isShowingNotifyModal', false);
      this.toggleProperty('isDeletedModal', false);
      console.log('close',this.get('isShowingModal'));
    }
  }

});

import Ember from 'ember';

export default Ember.Component.extend({

  Notification($timeout, btfModal){
      return (config) =>{
          let modal;
          modal = btfModal({
              templateUrl : 'templates/notification.html',
              controllerAs : 'notification',
              controller : () =>{
                  this.title = config.title;
                  this.message = config.message;
                  this.close = modal.deactivate;
                  this.type = config.type;
                  let timeout = config.timeout || 5000;
                  $timeout(modal.deactivate, timeout);
              }
          });
          modal.activate();

          this.destroy = () =>{
              modal.deactivate();
          };
      };
  }

});

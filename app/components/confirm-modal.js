import Ember from 'ember';

export default Ember.Component.extend({

  ConfirmModal(btfModal){

      return (config) =>{
          let modal;
          modal = btfModal({
              templateUrl : 'templates/confirmmodal.html',
              controllerAs : 'modal',
              controller(){
                  this.title = config.title;
                  this.message = config.message;
                  this.confirm = (config.confirm) ? () =>{config.confirm(); modal.deactivate();} : false;
                  this.cancel = modal.deactivate;
                  this.confirmText = config.confirmText || 'Confirm';
                  this.cancelText = config.cancelText || 'Cancel';
                  this.isDestructive = config.isDestructive;
              }
          });
          modal.activate();

          this.destroy = () =>{
              modal.deactivate();
          };
      };
  }

});

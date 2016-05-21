import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs){
      let init = false;
      let dateService;
      let deregister = $watch('event.dates', (value) =>{
          if (value && !init) {
              deregister();
          }
          init = true;
          /*
          dateService = new DatePickerService(event.dates);
          unsetDate = (date) =>{
              dateService.removeDate(date);
          };
          */
      });
  }

});

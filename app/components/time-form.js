import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs){
      let init = false;
      let dateService;
      let deregister = scope.$watch('event.dates', (value) =>{
          if (value && !init) {
              deregister();
          }
          init = true;
          dateService = new DatePickerService(scope.event.dates);
          scope.unsetDate = (date) =>{
              dateService.removeDate(date);
          };
      });
  }

});

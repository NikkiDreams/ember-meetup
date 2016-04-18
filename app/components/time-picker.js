import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs, ngModel){
      ngModel.$viewChangeListeners.push(() =>{
          scope.model = ngModel.$modelValue;
      });

      ngModel.$parsers.push(function (value) {
          if (!value) return;
          return Date.parse(value);
      });

      ngModel.$validators.time = (modelValue, viewValue) =>{
          if (ngModel.$isEmpty(modelValue)) return true;
          let time = Date.parse(modelValue);
          if (time) {
              ngModel.$setViewValue(time.toString("hh:mm tt"));
              ngModel.$render();
              return true;
          }
          return false;
      };
  }

});

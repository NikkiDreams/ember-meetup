import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs) {
      scope.errors = {};

      scope.$watchCollection('form.title.$error',(errors) =>{
          scope.errors.title = FormHelper.prettyError(errors, "Title");
      });

      scope.$watchCollection('form.location.$error',(errors) =>{
          scope.errors.location = FormHelper.prettyError(errors, "Location");
      });

  }


});

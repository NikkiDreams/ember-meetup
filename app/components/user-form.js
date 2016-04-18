import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs) {
      scope.errors = {};

      scope.emailRegex = FormHelper.emailRegex;

      scope.$watchCollection('form.name.$error',(errors) =>{
          scope.errors.name = FormHelper.prettyError(errors, "Name");
      });

      scope.$watchCollection('form.email.$error',(errors) =>{
          scope.errors.email = FormHelper.prettyError(errors, "Email");
      });
  }

});

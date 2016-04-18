import Ember from 'ember';

export default Ember.Component.extend({

  link(scope, el, attrs){
      scope.emailRegex = FormHelper.emailRegexString;
  }


});

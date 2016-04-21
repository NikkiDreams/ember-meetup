import Ember from 'ember';
import moment from 'moment';
import {
  validator, buildValidations
} from 'ember-cp-validations';

const {
  Component,
  computed,
  inject,
  set,
  get
} = Ember;


export default Ember.Component.extend( {
  moment: Ember.inject.service(),
  errors: {},
  name: null,
  email: null

  //isFormValid: Ember.computed.alias('validations.isValid'),
});

import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  Component,
  computed,
  inject,
  set,
  get
} = Ember;

const Validations = buildValidations({
  'name': {
    description: 'Name',
    validators: [
      validator('presence', true),
      validator('length', { min: 3 })
    ]
  },
  'email': {
    description: 'Email',
    validators:[
      validator('presence', true),
      validator('format', { type: 'email' }),
      validator('length', { min: 6 })
    ]
  }
});


export default Component.extend(Validations, {
  store: inject.service(),
  
  errors: {},
  name: null,
  email: null

  //isFormValid: Ember.computed.alias('validations.isValid'),
});

import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';


const {
  Model,
  attr,
  belongsTo
} = DS;

let Validations = buildValidations(Validations,{
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

export default Model.extend({
  name:  attr('string'),
  email:  attr('string'),
  isVerified: attr('boolean', {defaultValue : false}),
  isUnsubscribed: attr('boolean', {defaultValue : false}),
  allowNotifications: attr('boolean', {defaultValue : false}),
  createdAt : attr('date', { defaultValue() { return new Date(); } }),
  updatedAt : attr('date', { defaultValue() { return new Date(); } })
});

import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  Model,
  attr
} = DS;

let Validations = buildValidations({
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

export default Model.extend(Validations,{
  name :  attr('string'),
  email :  attr('string'),
  isVerified : attr('boolean', {defaultValue : false}),
  allowNotifications : attr('boolean', {defaultValue : false})
});

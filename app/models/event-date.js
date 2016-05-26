import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  Model,
  attr,
  hasMany
} = DS;

let Validations = buildValidations({
  'date': {
    description: 'Dates',
    validators: [
      validator('presence', true)
    ]
  }
});

export default Model.extend(Validations, {
  'eventId': attr('string'),
  'votes': hasMany('vote'),
  'dateTime': attr('date', { defaultValue() { return new Date(); } }),
  'selected': attr('boolean', {defaultValue : false} ),
  'createdAt': attr('date', { defaultValue() { return new Date(); } }),
  'updatedAt': attr('date', { defaultValue() { return new Date(); } })
});

import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  Model,
  attr
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
  date: attr('date', { defaultValue() { return new Date(); } })
});

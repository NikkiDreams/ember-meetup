import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  Model,
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
  email : attr('string'),
  votes: hasMany('vote')
});

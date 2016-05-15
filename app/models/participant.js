import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  Model,
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
  name : attr('string'),
  email : attr('string'),
  votes: belongsTo('votes')
});

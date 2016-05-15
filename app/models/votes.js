import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
  participant: belongsTo('participant'),
  votes : hasMany('vote')
});

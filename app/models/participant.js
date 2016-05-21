import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  name : attr('string'),
  email : attr('string'),
  votes: belongsTo('votes')
});

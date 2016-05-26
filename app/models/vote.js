import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  'eventId': attr('string'),
  'voterId': attr('string'),
  'chad': attr('boolean', {defaultValue : false}),
  'createdAt': attr('date', { defaultValue() { return new Date(); } }),
  'updatedAt': attr('date', { defaultValue() { return new Date(); } })
});

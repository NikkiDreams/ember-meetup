import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  eventId : attr('string'),
  authorId : attr('string'),
  content : attr('string'),
  createdAt : attr('date', { defaultValue() { return new Date(); } }),
  updatedAt : attr('date', { defaultValue() { return new Date(); } })
});

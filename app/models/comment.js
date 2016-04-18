import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  authorName : attr('string'),
  content : attr('string'),
  created : attr('date', { defaultValue() { return new Date(); } })
});

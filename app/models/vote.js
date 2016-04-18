import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  vote: attr('boolean', {defaultValue: true})
});

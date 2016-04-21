import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
      description : attr('string'),
      creator : belongsTo('creators'),
      created : attr('date', { defaultValue() { return new Date(); } }),
      updated : attr('date'),
      title : attr('string'),
      dates : hasMany('date'),
      email : attr('string'),
      comments : hasMany('comment'),
      location: attr('string'),
      participants : hasMany('participant'),
      isClosed : attr('boolean', {defaultValue : true}),
      isDeleted : attr('boolean', {defaultValue : true}),
      isExample : attr('boolean', {defaultValue : true}),
      __private : hasMany('code')
});

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
      emails : hasMany('email'),
      comments : hasMany('comment'),
      location: attr('string'),
      participants : hasMany('participant'),
      isClosed : attr('boolean', {defaultValue : false}),
      isDeleted : attr('boolean', {defaultValue : false}),
      __private : belongsTo('code')
});

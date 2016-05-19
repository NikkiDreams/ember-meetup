import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
      creator : belongsTo('creator'),

      description : attr('string'),
      location: attr('string'),
      title : attr('string'),
      dates : hasMany('date'),

      participants : hasMany('participant'),
      comments : hasMany('comment'),

      created : attr('date', { defaultValue() { return new Date(); } }),
      updated : attr('date'),

      isOpenPoll : attr('boolean', {defaultValue : false}),
      isNotified : attr('boolean', {defaultValue : true}),
      isDeleted : attr('boolean', {defaultValue : false}),
      __private : belongsTo('code')
});

import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
      creatorId : attr('string'),
      description : attr('string'),
      location: attr('string'),
      title : attr('string'),
      selectedDate : attr('string'),

      dates : hasMany('eventDate'),
      participants : hasMany('participant'),
      comments : hasMany('comment'),

      isOpenPoll : attr('boolean', {defaultValue : false}),
      isNotified : attr('boolean', {defaultValue : true}),
      isDeleted : attr('boolean', {defaultValue : false}),
      _verificationCode : attr('string'),
      _unsubscribeCode : attr('string'),

      createdAt : attr('date', { defaultValue() { return new Date(); } }),
      updatedAt : attr('date'),
});

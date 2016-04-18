import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  name :  attr('string'),
  email :  attr('string'),
  isVerified : attr('boolean', {defaultValue : false}),
  allowNotifications : attr('boolean', {defaultValue : true})
});

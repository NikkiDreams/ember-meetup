import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  verificationCode : attr('string'),
  unsubscribeCode : attr('string')
});

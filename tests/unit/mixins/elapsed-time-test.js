import Ember from 'ember';
import ElapsedTimeMixin from 'ember-meetup/mixins/elapsed-time';
import { module, test } from 'qunit';

module('Unit | Mixin | elapsed time');

// Replace this with your real tests.
test('it works', function(assert) {
  let ElapsedTimeObject = Ember.Object.extend(ElapsedTimeMixin);
  let subject = ElapsedTimeObject.create();
  assert.ok(subject);
});

import Ember from 'ember';
import ValidEmailMixin from 'ember-meetup/mixins/valid-email';
import { module, test } from 'qunit';

module('Unit | Mixin | valid email');

// Replace this with your real tests.
test('it works', function(assert) {
  let ValidEmailObject = Ember.Object.extend(ValidEmailMixin);
  let subject = ValidEmailObject.create();
  assert.ok(subject);
});

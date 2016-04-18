import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notify-flash-messages', 'Integration | Component | notify flash messages', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{notify-flash-messages}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#notify-flash-messages}}
      template block text
    {{/notify-flash-messages}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

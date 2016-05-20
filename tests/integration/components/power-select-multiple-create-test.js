import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('power-select-multiple-create', 'Integration | Component | power select multiple create', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{power-select-multiple-create}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#power-select-multiple-create}}
      template block text
    {{/power-select-multiple-create}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

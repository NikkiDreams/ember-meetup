import Ember from 'ember';
import layout from '../templates/components/power-select-multiple-create';
import { filterOptions, defaultMatcher } from 'ember-power-select/utils/group-utils';
const { computed, get } = Ember;

export default Ember.Component.extend({
  tagName: '',
  layout: layout,
  matcher: defaultMatcher,

  // Lifecycle hooks
  init() {
    this._super(...arguments);
    Ember.assert('{{power-select-with-create}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');
  },

  // CPs
  optionsArray: computed('options.[]', function() {
    let options = this.get('options');
    if (!options) { return Ember.A(); }
    if (options.then) {
      return options.then(value => Ember.A(value).toArray());
    } else {
      return Ember.A(options).toArray();
    }
  }),

  shouldShowCreateOption(term) {
    return this.get('showCreateWhen') ? this.get('showCreateWhen')(term) : true;
  },

  // Actions
  actions: {
    searchAndSuggest(term) {
      let newOptions = this.get('optionsArray');

      if (term.length === 0) {
        return newOptions;
      }

      newOptions = this.filter(Ember.A(newOptions), term);
      if (this.shouldShowCreateOption(term)) {
        newOptions.unshift(this.buildSuggestionForTerm(term));
      }

      return newOptions;
    },

    selectOrCreate(selection) {
      //console.log('selection',selection);
      let suggestion = selection.filter((option) => {
        return option.__isSuggestion__;
      })[0];

      if (selection && selection.__isSuggestion__) {
        suggestion = selection;
        //console.log('new suggestion',suggestion,selection);
      }
      //console.log("dawg",selection,suggestion);
      this.get('onchange')(selection, null);
    }
  },

  // Methods
  filter(options, searchText) {
    let matcher;
    if (this.get('searchField')) {
      matcher = (option, text) => this.matcher(get(option, this.get('searchField')), text);
    }
    else {
      matcher = (option, text) => this.matcher(option, text);
    }
    return filterOptions(options || [], searchText, matcher);
  },

  buildSuggestionForTerm(term) {
    return {
      __isSuggestion__: true,
      email: term,
      name: '',
      text: term //this.buildSuggestionLabel(term),
    };
  },

  buildSuggestionLabel(term) {
    let buildSuggestion = this.get('buildSuggestion');
    if (buildSuggestion) {
      return buildSuggestion(term);
    }
    return `Add "${term}"...`;
  }
});

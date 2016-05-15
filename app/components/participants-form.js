import Ember from 'ember';
import {uuid} from 'ember-cli-uuid';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  emailRegexString: '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$',
  emailRegex: new RegExp(this.emailRegexString),

  didInsertElement(){
    let thisComponent = this;
    let REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                  '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

    Ember.$('#participant_emails').selectize({
        plugins: ['restore_on_backspace', 'remove_button'],
        persist: false,
        maxItems: null,
        createOnBlur: true,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: this.get('participantList'),
        render: {
            item(item, escape) {
                return '<div>' +
                    (item.name ? '<span class="name">' + escape(item.name) + '</span> &nbsp;' : '') +
                    (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                '</div>';
            },
            option(item, escape) {
                let label = item.name || item.email;
                let caption = item.name ? item.email : null;
                return '<div>' +
                    '<span class="label">' + escape(label) + '</span> &nbsp;' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                '</div>';
            }
        },
        createFilter(input) {
            let match, regex;

            // email@address.com
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);

            // name <email@address.com>
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);

            return false;
        },
        create(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {email: input};
            }
            let match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email : match[2],
                    name  : $.trim(match[1])
                };
            }
            console.log('Invalid email address.');
            return false;
        },
        onItemAdd(value, $item){
          console.log("onItemAdd",value, $item);
          thisComponent.updateParticipantsStore(value);
        },
        onItemRemove(value){
          console.log("onItemRemove",value);
          thisComponent.removeParticipantFromStore(value);
        }
    });
  },

  removeParticipantFromStore(email){
    console.log('1',email);
    let begone = this.get('store').peekRecord('participant',{ email: email });
    console.log('2',begone);
    /*
    .then((perp)=>{
      console.log(perp);
      perp.destroyRecord()
    });
    */
  },

  updateParticipantsStore(email){
    this.get('store').createRecord('participant',{
      id: uuid(),
      name: null,
      email: email,
      votes: null
    });
  }

});

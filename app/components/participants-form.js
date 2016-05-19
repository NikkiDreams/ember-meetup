import Ember from 'ember';
import {uuid} from 'ember-cli-uuid';

const REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
              '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  selectControl: '#participant_emails',
  selectionList: Ember.A([]),

  emailRegexString: '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$',
  emailRegex: new RegExp(this.emailRegexString),

  createFilter(obj, input) {
      let regex = new RegExp('^' + REGEX_EMAIL + '$', 'i'),
          match = input.match(regex),
          select = Ember.$(this.selectControl);

      // format = email@address.com
      if (match) {
        Ember.Logger.debug('message',input, match, select);
        return !select.options.hasOwnProperty(match[0]);
      }

      // format =  name <email@address.com>
      regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
      match = input.match(regex);
      if (match) {
        Ember.Logger.debug('message',match[2]);
        return !select.options.hasOwnProperty(match[2]);
      }

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
              name  : Ember.$.trim(match[1])
          };
      }
      console.log('Invalid email address.');
      return false;
  },

  addItem(value, $item){
    console.log("onItemAdd",value, $item);
    this.updateParticipantsStore(value);
  },

  removeItem(value){
    console.log("onItemRemove",value);
    this.removeParticipantFromStore(value);
  },

  removeParticipantFromStore(email){
    console.log('1',email);
    let begone = this.get('store').queryRecord('participant',{ Email: email });
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
  },

  actions: {
    create(val){
      console.log("create",val);
      this.create(val);
    },

    createFilter(obj,val){
      console.log("createFilter",obj, val);
      this.createFilter(obj,val);
    },

    addItem(val){
      console.log("addItem",val);
      this.addItem(val);
    },

    removeItem(val){
      console.log("removeItem",val);
      this.removeItem(val);
    }
  }

});

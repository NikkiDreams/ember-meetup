import Ember from 'ember';
import {uuid} from 'ember-cli-uuid';
import moment from 'moment';
const {
  Component,
  computed,
  getOwner
} = Ember;

const REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
              '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

export default Component.extend({
  store: Ember.inject.service(),

  selectControl: '#participant_emails',
  selectionList: Ember.A([]),

  emailRegexString: '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$',
  emailRegex: new RegExp(this.emailRegexString),


  selectionsListDidChange: Ember.observer('selectionList', (list) =>{
    //console.log(_that.selectionList);
    Ember.run(list, 'updateParticipants');
    //this.get('controller').set('selectionList', newContact);
  }),

  updateParticipants(){
    let list = this.get('selectionList'),
        applicationInstance = getOwner(this),
        store = applicationInstance.lookup('service:store');
        store.unloadAll('participant');
    list.forEach((contact, index) => {
      contact['id'] = uuid();
      console.log('participant', contact, store);
      store.createRecord('participant', contact);
    });
    return list;
  },

  // Methods
  capitalizeSuggestion(term) {
    return `Hey! Perhaps you want to create ${term.toUpperCase()}??`;
  },

  createFilter(obj, input) {
      let regex = new RegExp('^' + REGEX_EMAIL + '$', 'i'),
          match = input.match(regex),
          select = Ember.$('#participant_emails');

      // format = email@address.com
      if (match) {
        //Ember.Logger.debug('message',input, match[0], select[0].options);
        return !select[0].options.hasOwnProperty(match[0].toString());
      }

      // format =  name <email@address.com>
      regex = new RegExp('^([^<]*)\<' + this.emailRegexString + '\>$', 'i');
      match = input.match(regex);
      if (match) {
        //Ember.Logger.debug('message',match[2],select[0].options);
        return !select[0].options.hasOwnProperty(match[2]);
      }

      return false;
  },

  create(contact) {
    Ember.Logger.debug('INPUT', contact);

    let newContact = { name: contact, email: contact };
          this.get('controller').get('participantList').pushObject(newContact);
          this.get('controller').set('selectionList', newContact);

          return this.get('participantList');
    /*
      if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
          console.log(Ember.$()[0].selectize);
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
      */
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
      console.log("create");
      this.create(val);

    },

    createFilter(obj,val){
      console.log("createFilter",this.createFilter(obj,val));

    },

    hideCreateOptionOnSameName(term) {
      let existingOption = this.get('participantList').findBy('email', term);
      return !existingOption;
    }
  }

});

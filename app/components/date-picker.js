import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed,
  getOwner,
  inject,
  set
} = Ember;

export default Component.extend({
  moment: inject.service(),
  store: inject.service(),

  tagName: 'div',
  className: 'date-picker',
  title: '',

  today: moment().format(),
  activeDate: null,
  day: null,
  days: Ember.A([]),

  eventDays: Ember.A([]),
  selectedDates: Ember.A([]),

  selectedDatesChanged: Ember.observer('selectedDates.[]', function(list) {
    // deal with the change
    Ember.run(list, 'updateDates');
    //Ember.Logger.debug('selectedDates Array Changed:', this.get('selectedDates'));
  }),

  init() {
    this._super(...arguments);
    this.set('selectedDates', []);
  },

  updateDates(){
    let list = this.get('selectedDates'),
        applicationInstance = getOwner(this),
        store = applicationInstance.lookup('service:store');
        store.unloadAll('date');
    list.forEach((dateTime, index) => {
      dateTime['id'] = uuid();
      console.log('date', dateTime, store);
      store.createRecord('date', dateTime);
    });
    return list;
  },

  didReceiveAttrs(){
    this.set('activeDate', moment(this.get('today')));
    this.setMonth(this.get('activeDate'));
  },

  setMonth(toDate){
      this.set('activeDate', toDate);
      let startDate = moment(this.get('activeDate')).startOf('month'), // get first day of active month
          startDateDOW = startDate.day(); // get day of the week for the active start date of the active month

      // Set the startDate to the previous Sunday
      if (startDateDOW === 0){
          startDate = moment(startDate).day(-7);
      } else {
          startDate = moment(startDate).day(0);
      }

      this.set('title', moment(this.get('activeDate')).format('MMMM YYYY'));
      let days = new Array(42);
      for (let i = 0; i < days.length; i++){
          let date = moment(startDate).add(i, 'd');
          days[i] = {
              date : date,
              isOutsideMonth : (moment(date).isSame(this.get('activeDate'), 'month')) ? false : true,
              isBeforeToday : (moment(date).isBefore(this.get('today'))) ? true : false,
              isToday : (moment(date).isSame(moment(), 'day')) ? true : false,
              isActive: (this.isActive(date, false)) ? true : false
          };
      }
      this.set('eventDays', days);
      this.set('days', days);
  },

  selectDay(dayObj){
    let activeIndex = this.isActive(dayObj, true);
      if (dayObj.isOutsideMonth) {
          this.setMonth(dayObj.date);
      }
      if ( activeIndex !== -1 ) {
          // Already selected
          set(dayObj, 'isActive', false);
          this.get('selectedDates').removeAt(activeIndex, 1); // remove
      } else {
          // Not selected
          let index = 0,
              inserted = false;
          do {
              if (this.get('selectedDates')[index] === undefined ||
                    moment(this.get('selectedDates')[index]).isSame(dayObj.date) > 0){
                  set(dayObj, 'isActive', true);
                  this.get('selectedDates').pushObject(dayObj);
                  inserted = true;
              }
              index++;
          } while (inserted === false);
      }
  },

  isActive(day, returnIndex){
    for (let i = 0; i < this.get('selectedDates').length; i++){
        let selectedDate = this.get('selectedDates')[i],
            testDate = (!returnIndex)? day : day.date;
        //Ember.Logger.debug('isActive', i, '\n----',testDate,'\n----' ,selectedDate.date );
        if ( moment(testDate).isSame(moment(selectedDate.date)) ){
            //Ember.Logger.debug('isActive', moment(selectedDate.date));
            return (returnIndex) ? i : true;
        }
    }
    return (returnIndex) ? -1 : false;
  },

  nextMonth(){
      this.setMonth(moment(this.get('activeDate')).add(1, 'M'));
  },

  prevMonth(){
      this.setMonth(moment(this.get('activeDate')).subtract(1, 'M'));
  },

  removeDate(date){
    let index = this.isActive(date, true);
    if (index !== -1) {
        set(date, 'isActive', false);
        this.get('selectedDates').removeAt(index, 1);
    }
  }

});

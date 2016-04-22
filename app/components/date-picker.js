import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed,
  inject,
  set,
  get
} = Ember;

export default Ember.Component.extend({
  moment: Ember.inject.service(),

  tagName: 'div',
  className: 'date-picker',
  title: '',

  today: moment().format(),
  activeDate: null,
  day: null,
  days: Ember.A([]),

  eventDays: Ember.A([]),
  selectedDates: Ember.A([]),
  isActive: false,

  init() {
    this._super(...arguments);
    this.set('selectedDates', []);
  },

  selectedDatesChanged: Ember.on('init', Ember.observer('selectedDates.[]', function() {
    // deal with the change
    Ember.Logger.debug(`selectedDates Array Changed: ${this.get('selectedDates')}`);
  })),

  didReceiveAttrs(){
    this.set('activeDate', moment(this.get('today')));
    //Ember.Logger.debug(this.get('activeDate'));
    this.setMonth(this.get('activeDate'));
  },

  setMonth(toDate){
    //Ember.Logger.debug(toDate, this.get('activeDate'));
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
            //Ember.Logger.debug("date",moment(date),moment().date());
          days[i] = {
              date : date,
              isOutsideMonth : (moment(date).isSame(this.get('activeDate'), 'month')) ? false : true,
              isBeforeToday : (moment(date).isBefore(this.get('today'))) ? true : false,
              isToday : (moment(date).isSame(moment(), 'day')) ? true : false,
              isActive: (this.isActive(date) === true) ? true : false
          };
      }
      this.set('eventDays', days);
      this.set('days', days);
      //Ember.Logger.debug(this.get('days'));
  },

  selectDay(dayObj){
    let activeIndex = this.isActive(dayObj.date, true);
      if (dayObj.isOutsideMonth) {
        //Ember.Logger.debug('selectDay.message', dayObj, this.get('eventDays'));
          this.setMonth(dayObj.date);
      }
      if ( activeIndex !== -1 ) {
          // Already selected
          set(dayObj, 'isActive', false);
          this.get('selectedDates').removeAt(activeIndex, 1)//.splice(index, 1); // remove
      } else {
          // Not selected
          let index = 0,
              inserted = false;
          do {
              if (this.get('selectedDates')[index] === undefined || moment(this.get('selectedDates')[index]).isSame(dayObj.date) > 0){
                  set(dayObj, 'isActive', true);
                  this.get('selectedDates').pushObject(dayObj.date); //splice(index, 0, dayObj.date);
                  inserted = true;
                  //Ember.Logger.debug('selectDay.selectedDates added', this.get('selectedDates'));
              }
              index++;
          } while (inserted === false);
      }
  },

  isActive(day, returnIndex){
      //this.set('scope.selectedDates', []);
      for (let i = 0; i < this.get('selectedDates').length; i++){
          let selectedDate = moment(this.get('selectedDates')[i]);
          if (selectedDate.date() === moment(day).date() &&
              selectedDate.month() === moment(day).month() &&
              selectedDate.year() === moment(day).year()){
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
    let index = this.isActive(moment(date), true);
      if (index !== -1) {
          this.get('selectedDates').removeAt(index, 1);
          //Ember.Logger.debug('selectDay.selectedDates remove', this.get('selectedDates'));
      }
  }

});

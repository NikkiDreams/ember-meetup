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
  scope: {},
  today: moment().format(),
  activeDate: null,
  day: null,
  days: Ember.A([]),

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

      this.set('scope.title', moment(this.get('activeDate')).format('MMMM YYYY'));
      let days = new Array(42);
      for (let i = 0; i < days.length; i++){
          let date = moment(startDate).add(i, 'd');
            //Ember.Logger.debug("date",moment(date),moment().date());
          days[i] = {
              date : date,
              isOutsideMonth : (moment(date).isSame(this.get('activeDate'), 'month')) ? false : true,
              isToday : ( moment(date).date() === moment().date() )
          };
      }
      this.set('scope.days', days);
      //this.set('days', days);
      //Ember.Logger.debug(this.get('scope.days'));
  },

  selectDay(dayObj){
    Ember.Logger.debug('message',dayObj,this.get('scope'));
      if (dayObj.isOutsideMonth) {
          this.setMonth(dayObj.date);
      }
      if ( this.isActive(dayObj.date, true) !== -1) {
          // Already selected
          this.get('scope').model.splice(index, 1); // remove
      } else {
          // Not selected
          let index = 0,
              inserted = false;
          do {
              if (this.get('scope').model[index] === undefined || moment(this.get('scope').model[index]).isSame(dayObj.date) > 0){
                  this.get('scope').model.splice(index, 0, dayObj.date);
                  inserted = true;
              }
              index++;
          } while (inserted === false);
      }
  },

  isActive(date, returnIndex){
      this.set('scope.model', []);
      for (let i = 0; i < this.get('scope').model.length; i++){
          let modelDate = Date.parse(this.get('scope').model[i]);
          if (modelDate.getDate() === date.getDate() &&
              modelDate.getMonth() === date.getMonth() &&
              modelDate.getYear() === date.getYear()){
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
      if ((index = this.get('scope').isActive(moment(date), true)) !== -1) {
          this.get('scope').model.splice(index, 1);
      }
  }

});

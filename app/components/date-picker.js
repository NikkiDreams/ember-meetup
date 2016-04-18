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

  willInsertElement(){
    Ember.Logger.debug(this.get('today'));
    this.set('activeDate', moment(this.get('today')));
  },

  didInsertElement(){
    Ember.Logger.debug(this.get('activeDate'));
    this.setMonth(this.get('activeDate'));
  },

  setMonth(toDate){
    Ember.Logger.debug(toDate, this.get('activeDate'));
      this.set('activeDate', toDate);
      let startDate = moment(this.get('activeDate')).date(1), // get first day of active month
          startDateDOW = startDate.day(); // get day of the week for the active start date of the active month

      // Set the startDate to the previous Sunday
      if (startDateDOW === 0){
          startDate.add(-7).days();
      } else {
          startDate.add(startDateDOW * -1).days();
      }
      this.set('scope.title', this.get('activeDate').format('MMMM YYYY'));
      let days = new Array(42);
      for (let i = 0; i < days.length; i++){
          let date = moment(startDate).add(i, 'd');
            Ember.Logger.debug("date",date);
          days[i] = {
              date : date,
              isOutsideMonth : (moment().date(date) !== moment().date(this.get('activeDate'))) ? true : false,
              isToday : (moment(date).isSame(this.get('today')))
          };
      }
      this.set('scope.days', days);
      //this.set('days', days);
      Ember.Logger.debug(this.get('scope.days'));
  },

  selectDay(dayObj){
      if (dayObj.isOutsideMonth) {
          setMonth(dayObj.date);
      }
      if ((index = this.get('scope').isActive(dayObj.date, true)) !== -1) {
          // Already selected
          this.get('scope').model.splice(index, 1); // remove
      } else {
          // Not selected
          let index = 0,
              inserted = false;
          do {
              if (this.get('scope').model[index] === undefined || Date.compare(Date.parse(this.get('scope').model[index]), dayObj.date) > 0){
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
      setMonth(activeDate.clone().add(1).months());
  },

  prevMonth(){
      setMonth(activeDate.clone().add(-1).months());
  },

  removeDate(date){
      if ((index = this.get('scope').isActive(Date.parse(date), true)) !== -1) {
          this.get('scope').model.splice(index, 1);
      }
  }

});

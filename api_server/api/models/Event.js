'use strict';
import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //console.error("DataBase appears to be down.");
  //mongoose.connect(require('./connection-string'));
}


let schema = new Schema({
  //'_id': { type: Schema.Types.ObjectId, unique: true, index: true, ref: '' },
  'description': { type: String },
  'title': { type: String },
  'location': { type: String },
  'isOpen': { type: Boolean, default: true },
  'isDeleted': { type: Boolean, default: false },
  'allowNotifications': { type: Boolean, default: true },
  '_verificationCode': { type: String },
  '_unsubscribeCode': { type: String },
  'creatorId': { type: Schema.Types.ObjectId, ref: 'creator' },
  'participants': { type: Array, ref: 'participant' },
  'dates': { type: Array, ref: 'eventDate' },
  'selectedDate': { type: Schema.Types.ObjectId, ref: 'date' },
  'comments': { type: Array, ref: 'comment' },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

schema.set({
  safe: true,
  strict: true,
  toJSON:{
    getters: true,
    virtuals: false,
    minimize: true
  },
  versionKey: false,
  validateBeforeSave: true,
  timestamps: true,
  useNestedStrict: true
});

schema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

schema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

schema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


//var model = mongoose.model('Event', schema);
/*
model.schema
    .path('title')
    .required('You need to give your event a title');
model.schema
    .path('creator.name')
    .required('You need to type in your name')
model.schema
    .path('creator.email')
    .required('You need to type in your email')
    .validate(function(email) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
    }, 'You need to type in a valid email')
model.schema
    .path('dates')
    .validate(function(dates){
        return dates.length
    }, 'You didn\'t select any dates');
model.schema
    .path('participants')
    .validate(function(participants){
        for (let i = 0; i < participants.length; i++){
            if (!participants[i].name){
                return false;
            }
        }
        return true;
    }, 'Participants must have a name')
*/

export default mongoose.model('Event', schema);

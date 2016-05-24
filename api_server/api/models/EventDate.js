'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //mongoose.connect(require('./connection-string'));
}


let eventDateSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, unique: true, ref: '' },
  'eventId': { type: Schema.Types.ObjectId, ref: 'event' },
  'votes': { type: Array, ref: 'vote' },
  'dateTime': { type: Date },
  'selected': { type: Boolean, default: false },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

eventDateSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

eventDateSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

eventDateSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



export default mongoose.model('EventDate', eventDateSchema);

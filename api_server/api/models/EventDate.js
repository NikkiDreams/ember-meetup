'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //mongoose.connect(require('./connection-string'));
}


let schema = new Schema({
  //'_id': { type: Schema.Types.ObjectId, unique: true, ref: '' },
  'eventId': { type: Schema.Types.ObjectId, ref: 'event' },
  'votes': { type: Array, ref: 'vote' },
  'dateTime': { type: Date },
  'selected': { type: Boolean, default: false },
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



export default mongoose.model('EventDate', schema);

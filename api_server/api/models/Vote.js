'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //mongoose.connect(require('./connection-string'));
}


let voteSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, ref: '' },
  'eventId': { type: Schema.Types.ObjectId, ref: 'Event' },
  'voterId': { type: Schema.Types.ObjectId, ref: 'Participant' },
  'chad': { type: Boolean, default: false },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

voteSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

voteSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

voteSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



export default mongoose.model('Vote', voteSchema);

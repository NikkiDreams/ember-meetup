'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //mongoose.connect(require('./connection-string'));
}


let participantSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, unique: true, index: true, ref: '' },
  'name': { type: String },
  'email': { type: String, unique: true },
  'isVerified': { type: Boolean,default: false },
  'isUnsubscribed': { type: Boolean, default: false },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

participantSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

participantSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

participantSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



export default mongoose.model('Participant', participantSchema);

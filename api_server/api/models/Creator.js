'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //mongoose.connect(require('./connection-string'));
}


let creatorSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, ref: 'participant', index: true },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

creatorSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

creatorSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

creatorSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



export default mongoose.model('Creator', creatorSchema);

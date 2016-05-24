'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  //mongoose.connect(require('./connection-string'));
}


let commentSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, unique: true, ref: '' },
  'eventId': { type: Schema.Types.ObjectId, ref: 'event' },
  'authorId': { type: Schema.Types.ObjectId, ref: 'participant' },
  'content': { type: String },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

commentSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

commentSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

commentSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



export default mongoose.model('Comment', commentSchema);

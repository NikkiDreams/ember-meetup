var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, ref: '' },
  'eventId': { type: Schema.Types.ObjectId, ref: 'Event' },
  'voterId': { type: Schema.Types.ObjectId, ref: 'Participant' },
  'chad': { type: Boolean, default: false },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Vote', newSchema);

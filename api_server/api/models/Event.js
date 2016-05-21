var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, unique: true, index: true, ref: '' },
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
  'dates': { type: Array, ref: 'date' },
  'selectedDate': { type: Schema.Types.ObjectId, ref: 'date' },
  'comments': { type: Array, ref: 'comment' },
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



module.exports = mongoose.model('Event', newSchema);

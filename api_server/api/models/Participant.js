var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var debug = require('debug')('ember-meetup');
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  '_id': { type: Schema.Types.ObjectId, unique: true, index: true, ref: '' },
  'name': { type: String },
  'email': { type: String, unique: true },
  'isVerified': { type: Boolean,default: false },
  'isUnsubscribed': { type: Boolean, default: false },
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



module.exports = mongoose.model('Participant', newSchema);

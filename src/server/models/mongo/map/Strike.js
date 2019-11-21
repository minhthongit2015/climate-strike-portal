
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Place = require('./_Place');

const StrikeSchema = new mongoose.Schema({
  type: { type: String, default: 'Strike' },
  time: Date,
  contact: String,
  next: { type: ObjectId, ref: 'Strike' },
  prev: { type: ObjectId, ref: 'Strike' }
});
const StrikeModel = Place.discriminator('Strike', StrikeSchema);

module.exports = StrikeModel;

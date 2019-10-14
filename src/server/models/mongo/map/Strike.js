
const mongoose = require('mongoose');
const Place = require('./_Place');

const StrikeSchema = new mongoose.Schema({
  type: { type: String, default: 'Strike' },
  local_ip: String,
  physical_address: String
});
const StrikeModel = Place.discriminator('Strike', StrikeSchema);

module.exports = StrikeModel;

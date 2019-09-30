
const mongoose = require('mongoose');
const Marker = require('./Marker');

const StrikeSchema = new mongoose.Schema({
  type: { type: String, default: 'Strike' },
  local_ip: String,
  physical_address: String
});
const StrikeModel = Marker.discriminator('Strike', StrikeSchema);

module.exports = StrikeModel;

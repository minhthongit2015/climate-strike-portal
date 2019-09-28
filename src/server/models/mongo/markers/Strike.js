
const mongoose = require('mongoose');
const Entity = require('./Marker');

const StrikeSchema = new mongoose.Schema({
  type: { type: String, default: 'Strike' },
  local_ip: String,
  physical_address: String
});
const StrikeModel = Entity.discriminator('Strike', StrikeSchema);

module.exports = StrikeModel;

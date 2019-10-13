
const mongoose = require('mongoose');
const Marker = require('./Marker');

const PollutionSchema = new mongoose.Schema({
  type: { type: String, default: 'Pollution' },
  local_ip: String,
  physical_address: String
});
const PollutionModel = Marker.discriminator('Pollution', PollutionSchema);

module.exports = PollutionModel;

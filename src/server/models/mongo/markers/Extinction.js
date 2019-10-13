
const mongoose = require('mongoose');
const Marker = require('./Marker');

const ExtinctionSchema = new mongoose.Schema({
  type: { type: String, default: 'Extinction' },
  local_ip: String,
  physical_address: String
});
const ExtinctionModel = Marker.discriminator('Extinction', ExtinctionSchema);

module.exports = ExtinctionModel;

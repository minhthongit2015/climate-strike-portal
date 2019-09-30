
const mongoose = require('mongoose');
const Marker = require('./Marker');

const EndangerSpiecesSchema = new mongoose.Schema({
  type: { type: String, default: 'EndangerSpieces' },
  local_ip: String,
  physical_address: String
});
const EndangerSpiecesModel = Marker.discriminator('EndangerSpieces', EndangerSpiecesSchema);

module.exports = EndangerSpiecesModel;

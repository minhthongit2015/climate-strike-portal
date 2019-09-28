
const mongoose = require('mongoose');
const Entity = require('./Marker');

const EndangerSpiecesSchema = new mongoose.Schema({
  type: { type: String, default: 'EndangerSpieces' },
  local_ip: String,
  physical_address: String
});
const EndangerSpiecesModel = Entity.discriminator('EndangerSpieces', EndangerSpiecesSchema);

module.exports = EndangerSpiecesModel;

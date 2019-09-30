
const mongoose = require('mongoose');
const Marker = require('./Marker');

const DisasterSchema = new mongoose.Schema({
  type: { type: String, default: 'Disaster' }
});
const DisasterModel = Marker.discriminator('Disaster', DisasterSchema);

module.exports = DisasterModel;

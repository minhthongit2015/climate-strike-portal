
const mongoose = require('mongoose');
const Marker = require('./Marker');

const ActingCountrySchema = new mongoose.Schema({
  type: { type: String, default: 'ActingCountry' }
});
const ActingCountryModel = Marker.discriminator('ActingCountry', ActingCountrySchema);

module.exports = ActingCountryModel;

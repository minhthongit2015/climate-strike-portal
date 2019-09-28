
const mongoose = require('mongoose');
const Entity = require('./Marker');

const ActingCountrySchema = new mongoose.Schema({
  type: { type: String, default: 'ActingCountry' }
});
const ActingCountryModel = Entity.discriminator('ActingCountry', ActingCountrySchema);

module.exports = ActingCountryModel;

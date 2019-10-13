
const mongoose = require('mongoose');
const Area = require('./Area');

const ActingCountrySchema = new mongoose.Schema({
  type: { type: String, default: 'ActingCountry' }
});
const ActingCountryModel = Area.discriminator('ActingCountry', ActingCountrySchema);

module.exports = ActingCountryModel;

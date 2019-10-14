
const mongoose = require('mongoose');
const Place = require('./_Place');

const PollutionSchema = new mongoose.Schema({
  type: String // Chất độc, Chất thải, Rác thải
});

const PollutionModel = Place.discriminator('Pollution', PollutionSchema);

module.exports = PollutionModel;


const mongoose = require('mongoose');
const Place = require('./_Place');

const ExtinctionSchema = new mongoose.Schema({
  type: String // Loài
});

const ExtinctionModel = Place.discriminator('Extinction', ExtinctionSchema);

module.exports = ExtinctionModel;

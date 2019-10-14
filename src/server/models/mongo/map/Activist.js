
const mongoose = require('mongoose');
const Place = require('./_Place');

const ActivistSchema = new mongoose.Schema({
});

const ActivistModel = Place.discriminator('Activist', ActivistSchema);

module.exports = ActivistModel;

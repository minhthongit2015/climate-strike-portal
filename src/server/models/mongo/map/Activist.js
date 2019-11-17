
const mongoose = require('mongoose');
const Place = require('./_Place');

const { ObjectId } = mongoose.Schema.Types;

const ActivistSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' }
});

const ActivistModel = Place.discriminator('Activist', ActivistSchema);

module.exports = ActivistModel;

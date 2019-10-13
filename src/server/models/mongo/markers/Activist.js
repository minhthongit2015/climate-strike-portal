
const mongoose = require('mongoose');
const Marker = require('./Marker');

const { ObjectId } = mongoose.Schema.Types;

const ActivistSchema = new mongoose.Schema({
  type: { type: String, default: 'Activist' },
  avatar: String,
  user: { type: ObjectId, ref: 'User' }
});
const ActivistModel = Marker.discriminator('Activist', ActivistSchema);

module.exports = ActivistModel;

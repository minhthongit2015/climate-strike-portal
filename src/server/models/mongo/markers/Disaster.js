
const mongoose = require('mongoose');
const Entity = require('./Marker');

const DisasterSchema = new mongoose.Schema({
  type: { type: String, default: 'Disaster' }
});
const DisasterModel = Entity.discriminator('Disaster', DisasterSchema);

module.exports = DisasterModel;

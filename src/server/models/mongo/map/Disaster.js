
const mongoose = require('mongoose');
const Place = require('./_Place');

const DisasterSchema = new mongoose.Schema({
  type: String // Bão, Cháy rừng, Động đất, Sóng thần, Hạn hán, Mất mùa
});

const DisasterModel = Place.discriminator('Disaster', DisasterSchema);

module.exports = DisasterModel;

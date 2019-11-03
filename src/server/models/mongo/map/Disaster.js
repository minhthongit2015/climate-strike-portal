
const mongoose = require('mongoose');
const Place = require('./_Place');

const DisasterSchema = new mongoose.Schema({
  type: String, // Bão, Cháy rừng, Động đất, Núi lửa, Sóng thần, Lũ lụt, Hạn hán, Mất mùa
  events: [{
    time: { type: Date, default: Date.now },
    title: String,
    summary: String,
    content: String,
    relatedLink: [String]
  }]
});

const DisasterModel = Place.discriminator('Disaster', DisasterSchema);

module.exports = DisasterModel;

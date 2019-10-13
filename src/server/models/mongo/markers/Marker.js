
const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
  type: String, // Strike, Activist, Disaster, Extinction
  position: {
    lat: Number,
    lng: Number
  },
  name: String,
  picture: String,
  description: String,
  link: String
});

const MarkerModel = mongoose.model('Marker', MarkerSchema);

module.exports = MarkerModel;

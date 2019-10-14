
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

// Marker, Area
// Strike, Activist, ActivistGroup, Disaster, Extinction, Pollution
const PlaceSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  name: String,
  picture: String,
  description: String,
  link: String,
  position: {
    lat: Number,
    lng: Number
  },
  path: [{
    lat: Number,
    lng: Number
  }],
  radius: Number, // If radius -> render Circle
  address: String
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;


const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

// Marker, Area
// Strike, Activist, ActivistGroup, Disaster, Extinction, Pollution
const PlaceSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  name: String,
  images: [String],
  description: String,
  link: String,
  position: { lat: Number, lng: Number },
  path: [{ lat: Number, lng: Number }], // Render Polyline
  radius: Number, // Render Circle
  address: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;

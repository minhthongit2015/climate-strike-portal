
const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { ObjectId } = mongoose.Schema.Types;

// Marker, Area
// Strike, Activist, ActivistGroup, Action, Disaster, Extinction, Pollution
const PlaceSchema = new mongoose.Schema({
  author: { type: ObjectId, ref: 'User' },
  post: { type: ObjectId, ref: 'Post' },
  name: String,
  avatar: String,
  cover: String,
  images: [String],
  description: String,
  address: String,
  link: String,
  position: { lat: Number, lng: Number },
  zoom: Number,
  path: [{ lat: Number, lng: Number }], // Render Polyline
  radius: Number, // Render Circle
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PlaceSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Place', field: 'baseOrder' });

const PlaceModel = mongoose.model('Place', PlaceSchema);
module.exports = PlaceModel;

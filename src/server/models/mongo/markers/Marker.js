
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const MarkerSchema = new mongoose.Schema({
  type: String, // Strike, Disaster, Endangered Species
  name: String,
  picture: String,
  cover: String,
  description: String,
  position: {
    lat: Number,
    lng: Number
  },
  address: String,
  goods: [{ type: Object }],
  users: [{ type: ObjectId, ref: 'User' }],
  socials: Object
});
const MarkerModel = mongoose.model('Marker', MarkerSchema);

module.exports = MarkerModel;

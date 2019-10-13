
const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
  type: String, // Acting Country
  path: [{
    lat: Number,
    lng: Number
  }],
  name: String,
  picture: String,
  description: String,
  link: String
});

const AreaModel = mongoose.model('Area', AreaSchema);

module.exports = AreaModel;

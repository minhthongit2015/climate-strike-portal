
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  password: String,
  role: String,
  name: String,
  email: String,
  latestRead: {
    category: String,
    timestamp: Date
  },
  picture: String,
  cover: String,
  description: String,
  entities: [{ type: ObjectId, ref: 'Entity' }],
  age: Number,
  married: Boolean,
  childs: Number,
  salary: Number,
  hoobies: [{ type: String }],
  address: String,
  favorite_foods: [{ type: String }],
  favorite_songs: [{ type: String }],
  personality: [{ type: String }],
  socials: {
    facebook: String,
    twitter: String,
    instagram: String
  },
  socialPoint: {
    type: Number,
    default: 0
  }
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

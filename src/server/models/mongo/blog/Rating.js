
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const RatingSchema = new mongoose.Schema({
  categories: [{ type: ObjectId, ref: 'Rating' }],
  authors: [{ type: ObjectId, ref: 'User' }],
  vote: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const RatingModel = mongoose.model('Rating', RatingSchema);
module.exports = RatingModel;

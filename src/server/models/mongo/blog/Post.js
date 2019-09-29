
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  categories: [{ type: ObjectId, ref: 'Category' }],
  title: String,
  content: String,
  summary: String,
  preview: String,
  author: [{ type: ObjectId, ref: 'User' }],
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

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;

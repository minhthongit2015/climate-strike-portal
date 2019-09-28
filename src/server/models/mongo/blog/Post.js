
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  category: [{ type: ObjectId, ref: 'Category' }],
  title: String,
  preview: String,
  content: String,
  summary: String,
  author: [{ type: ObjectId, ref: 'User' }],
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

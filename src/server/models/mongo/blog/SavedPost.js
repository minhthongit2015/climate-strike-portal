
const mongoose = require('mongoose');
const Post = require('./Post');

const { ObjectId } = mongoose.Schema.Types;

const SavedPostSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  post: { type: ObjectId, ref: 'Post' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

SavedPostSchema.post('save', async (savedPost) => {
  const post = await Post.findById(savedPost.post);
  post.totalSaved = (post.totalSaved || 0) + 1;
  post.save();
}, { query: true, document: true });

const SavedPostModel = mongoose.model('SavedPost', SavedPostSchema);
module.exports = SavedPostModel;

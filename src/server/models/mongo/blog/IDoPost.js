
const mongoose = require('mongoose');
const Post = require('./Post');

const { ObjectId } = mongoose.Schema.Types;

const IDoPostSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  post: { type: ObjectId, ref: 'Post' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

IDoPostSchema.post('save', async (IDoPost) => {
  const post = await Post.findById(IDoPost.post);
  post.totalIDo = (post.totalIDo || 0) + 1;
  post.save();
}, { query: true, document: true });

const IDoPostModel = mongoose.model('IDoPost', IDoPostSchema);
module.exports = IDoPostModel;

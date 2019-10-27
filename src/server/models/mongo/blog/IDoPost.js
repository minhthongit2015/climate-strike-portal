
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

async function increaseTotalIDo(iDoPost) {
  const post = await Post.findById(iDoPost.post);
  post.totalIDo = (post.totalIDo || 0) + 1;
  post.save();
}

async function decreaseTotalIDo(savedPost) {
  const post = await Post.findById(savedPost.post);
  post.totalIDo = (post.totalIDo || 0) - 1;
  post.totalIDo = Math.max(post.totalIDo, 0);
  post.save();
}

IDoPostSchema.post('save', async (iDoPost) => {
  increaseTotalIDo(iDoPost);
}, { query: true, document: true });

IDoPostSchema.post('updateOne', async (iDoPost) => {
  increaseTotalIDo(iDoPost);
}, { query: true, document: true });

IDoPostSchema.post('delete', async (iDoPost) => {
  decreaseTotalIDo(iDoPost);
}, { query: true, document: true });

IDoPostSchema.post('findOneAndDelete', async (iDoPost) => {
  decreaseTotalIDo(iDoPost);
}, { query: true, document: true });

const IDoPostModel = mongoose.model('IDoPost', IDoPostSchema);
module.exports = IDoPostModel;

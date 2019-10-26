
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

async function increseTotalSaved(savedPost) {
  const post = await Post.findById(savedPost.post);
  post.totalSaved = (post.totalSaved || 0) + 1;
  post.save();
}

async function decreseTotalSaved(savedPost) {
  const post = await Post.findById(savedPost.post);
  post.totalSaved = (post.totalSaved || 0) - 1;
  post.totalSaved = Math.max(post.totalSaved, 0);
  post.save();
}

SavedPostSchema.post('save', async (savedPost) => {
  increseTotalSaved(savedPost);
}, { query: true, document: true });

SavedPostSchema.post('updateOne', async (savedPost) => {
  increseTotalSaved(savedPost);
}, { query: true, document: true });

SavedPostSchema.post('delete', async (savedPost) => {
  decreseTotalSaved(savedPost);
}, { query: true, document: true });

SavedPostSchema.post('findOneAndDelete', async (savedPost) => {
  decreseTotalSaved(savedPost);
}, { query: true, document: true });

const SavedPostModel = mongoose.model('SavedPost', SavedPostSchema);
module.exports = SavedPostModel;

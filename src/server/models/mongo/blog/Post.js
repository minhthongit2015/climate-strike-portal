
const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  categories: [{ type: ObjectId, ref: 'Category' }],
  title: String,
  content: String,
  summary: String,
  preview: String,
  status: String, // draft, pending, approved, scheduled, published, archived
  authors: [{ type: ObjectId, ref: 'User' }],
  totalRating: {
    type: Number,
    default: 0
  },
  totalVotes: {
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

async function deleteRelatedDocs(post) {
  // eslint-disable-next-line global-require
  const Rating = require('./Rating');
  await Rating.deleteMany({ post: post._id });

  // eslint-disable-next-line global-require
  const SavedPost = require('./SavedPost');
  await SavedPost.deleteMany({ post: post._id });
}

PostSchema.post('delete', async (posts) => {
  deleteRelatedDocs(posts);
});

PostSchema.post('remove', async (post) => {
  deleteRelatedDocs(post);
});

PostSchema.post('findOneAndDelete', async (post) => {
  deleteRelatedDocs(post);
});

PostSchema.post('findByIdAndDelete', async (post) => {
  deleteRelatedDocs(post);
});


PostSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Post', field: 'baseOrder' });

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;

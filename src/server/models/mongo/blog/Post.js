
const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Rating = require('./Rating');

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

PostSchema.post('remove', async (doc) => {
  const ratings = await Rating.find({
    where: {
      post: doc._id
    }
  });
  ratings.forEach(rating => rating.remove());
});

PostSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Post', field: 'baseOrder' });

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;

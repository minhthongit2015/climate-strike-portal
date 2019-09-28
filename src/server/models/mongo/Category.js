
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = new mongoose.Schema({
  parent: [
    { type: ObjectId, ref: 'Category' }
  ],
  name: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const CategoryModel = mongoose.model('Post', CategorySchema);
module.exports = CategoryModel;

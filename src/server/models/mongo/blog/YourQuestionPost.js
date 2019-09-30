

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('./Post');

const YourQuestionPostSchema = new mongoose.Schema({
  //
});

YourQuestionPostSchema.plugin(
  MongooseAutoIncrementID.plugin,
  { modelName: 'YourQuestionPost', field: 'order' }
);

const YourQuestionPostModel = Post.discriminator('YourQuestionPost', YourQuestionPostSchema);

module.exports = YourQuestionPostModel;

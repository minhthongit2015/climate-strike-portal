

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('./Post');

const EarthPostSchema = new mongoose.Schema({
  //
});

EarthPostSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'EarthPost', field: 'order' });

const EarthPostModel = Post.discriminator('EarthPost', EarthPostSchema);

module.exports = EarthPostModel;

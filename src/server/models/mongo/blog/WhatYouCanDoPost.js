

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('./Post');

const WhatYouCanDoPostSchema = new mongoose.Schema({
  //
});

WhatYouCanDoPostSchema.plugin(
  MongooseAutoIncrementID.plugin,
  { modelName: 'WhatYouCanDoPost', field: 'order' }
);

const WhatYouCanDoPostModel = Post.discriminator('WhatYouCanDoPost', WhatYouCanDoPostSchema);

module.exports = WhatYouCanDoPostModel;

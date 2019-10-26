
const { SavedPost } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');

module.exports = class extends CRUDService {
  static get model() {
    return SavedPost;
  }

  static get populate() {
    return ['post', 'user'];
  }

  static async getOrListMin(id, opts = ApiHelper.listParams) {
    const posts = await super.getOrList(id, opts);
    if (posts.length != null) {
      posts.forEach((post) => {
        delete post.user;
      });
    } else {
      delete posts.user;
    }
    return posts.filter(post => post.post);
  }

  static async addSavedPost(post, user) {
    const savedPost = {
      user: user._id,
      post: post._id
    };
    return this.createOrUpdate(savedPost, savedPost);
  }

  static async removeSavedPost(postId, user) {
    const removeSignal = {
      user: user._id,
      post: postId
    };
    return this.findOneAndDelete(removeSignal);
  }

  static async appendIsSavedOfUser(posts, user) {
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    return Promise.all(posts.map(
      post => SavedPost.findOne({
        user: user._id,
        post: post._id
      }).then((savedPost) => {
        if (savedPost) {
          post.isSaved = true;
        }
      })
    ));
  }
};

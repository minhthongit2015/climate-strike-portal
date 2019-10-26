
const { SavedPost } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const PostService = require('./Post');

module.exports = class extends CRUDService {
  static get model() {
    return SavedPost;
  }

  static get populate() {
    return [];
  }

  static async getOrListMin(id, opts = ApiHelper.listParams, user) {
    opts = Object.assign(opts || {}, {
      where: {
        user: user._id
      }
    });
    const savedPosts = await this.getOrList(id, opts);
    const postIds = savedPosts.map(savedPost => savedPost.post);
    const posts = await PostService.list({
      where: {
        _id: {
          $in: postIds
        }
      },
      limit: postIds.length
    });
    return posts;
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
    const postIds = posts.map(post => post._id);
    const savedPosts = await this.list({
      where: {
        user: user._id,
        post: {
          $in: postIds
        }
      },
      limit: postIds.length
    });
    savedPosts.forEach((savedPost) => {
      posts.find(post => post._id === savedPost.post).isSaved = true;
    });
    return savedPosts;
  }
};

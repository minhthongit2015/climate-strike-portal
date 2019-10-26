
const { IDoPost } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const PostService = require('./Post');

module.exports = class extends CRUDService {
  static get model() {
    return IDoPost;
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
    const iDoPosts = await this.getOrList(id, opts);
    const postIds = iDoPosts.map(iDoPost => iDoPost.post);
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

  static async addIDoPost(post, user) {
    const iDoPost = {
      user: user._id,
      post: post._id
    };
    return this.createOrUpdate(iDoPost, iDoPost);
  }

  static async removeIDoPost(postId, user) {
    const removeSignal = {
      user: user._id,
      post: postId
    };
    return this.findOneAndDelete(removeSignal);
  }

  static async appendIWillDoThisOfUser(posts, user) {
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    const postIds = posts.map(post => post._id);
    const iDoPosts = await this.list({
      where: {
        user: user._id,
        post: {
          $in: postIds
        }
      },
      limit: postIds.length
    });
    iDoPosts.forEach((iDoPost) => {
      posts.find(post => post._id === iDoPost.post).iWillDoThis = true;
    });
    return iDoPosts;
  }
};

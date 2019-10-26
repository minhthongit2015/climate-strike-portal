
const { SavedPost } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const UserService = require('../user/User');

module.exports = class extends CRUDService {
  static get model() {
    return SavedPost;
  }

  static get populate() {
    return ['post', 'user'];
  }

  static async savePost(post, user) {
    const savedPost = {
      user: user._id,
      post: post._id
    };
    const saveResult = await this.createOrUpdate(savedPost, savedPost);
    if (saveResult.ok && saveResult.n) {
      await UserService.updateSocialPoint(user, 1);
    }
    return saveResult;
  }

  static async removePost(postId, user) {
    const removeSignal = {
      user: user._id,
      post: postId
    };
    const deleteResult = this.findOneAndDelete(removeSignal);
    if (deleteResult.ok && deleteResult.n) {
      await UserService.updateSocialPoint(user, -1);
    }
    return deleteResult;
  }
};

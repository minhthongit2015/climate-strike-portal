
const { Rating } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const PostService = require('./Post');
const UserService = require('../user/User');

module.exports = class extends CRUDService {
  static get model() {
    return Rating;
  }

  static get populate() {
    return ['post', 'user'];
  }

  static async rating(post, user, rating) {
    const oldRating = await this.first({
      where: {
        post: post._id,
        user: user._id
      }
    });

    if (!oldRating) {
      const newRating = await this.create({
        user: user._id,
        post: post._id,
        rating
      });

      // Update user social point
      if (!user.socialPoint) {
        user.socialPoint = 0;
      }
      user.socialPoint += 1;
      user.dirty = true;

      return newRating;
    }

    // Update post rating
    PostService.update(post._id, {
      totalRating: post.totalRating - oldRating.rating + rating
    });

    // Update rating record
    oldRating.rating = rating;
    await this.update({
      _id: oldRating._id,
      rating
    });

    await UserService.update({
      _id: user._id,
      socialPoint: user.socialPoint
    });

    return oldRating;
  }
};

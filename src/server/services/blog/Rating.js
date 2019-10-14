
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
      const userz = await UserService.get(user._id);
      if (!userz.socialPoint) {
        userz.socialPoint = 0;
      }
      userz.socialPoint += 1;
      userz.dirty = true;
      Object.assign(user, userz);

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

  static async appendRatingOfUser(post, user) {
    const ratingRecord = await Rating.findOne({
      user: user._id,
      post: post._id
    });
    if (ratingRecord) {
      post.rating = ratingRecord.rating;
    }
    return post;
  }
};

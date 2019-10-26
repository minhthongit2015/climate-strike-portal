
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
      await UserService.updateSocialPoint(user, 1);
      return newRating;
    }

    PostService.update(post._id, {
      totalRating: post.totalRating - oldRating.rating + rating
    });
    oldRating.rating = rating;
    await this.update({
      _id: oldRating._id,
      rating
    });

    return oldRating;
  }

  static async appendRatingOfUser(posts, user) {
    if (!posts) return null;
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    return Promise.all(posts.map(
      post => Rating.findOne({
        user: user._id,
        post: post._id
      }).then((ratingRecord) => {
        if (ratingRecord) {
          post.rating = ratingRecord.rating;
        }
      })
    ));
  }
};

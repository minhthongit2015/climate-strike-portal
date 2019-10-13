const Converter = require('./converter');
const UserConverter = require('./UserConverter');

module.exports = class extends Converter {
  static convert(object) {
    if (!object) return object;
    const rawRating = JSON.parse(JSON.stringify(object));
    return {
      _id: rawRating._id,
      rating: rawRating.rating,
      user: UserConverter.convert(rawRating.user),
      post: super.convert(rawRating.post)
    };
  }
};

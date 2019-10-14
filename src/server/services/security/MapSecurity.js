const HttpErrors = require('http-errors');
const { errorOrFalse } = require('./SecurityHelper');
const SecurityService = require('./index');


module.exports = class extends SecurityService {
  static filterUnallowedProperties(post) {
    if (!post || typeof post !== 'object') {
      return null;
    }
    const allowedProps = [
      '_id',
      'title',
      'content',
      'summary',
      'preview',
      'categories',
      'status'
    ];
    Object.keys(post).forEach((key) => {
      if (!allowedProps.includes(key)) {
        delete post[key];
      }
    });
    return post;
  }

  static onlyValidPost(req, throwError = true) {
    const post = req.body;
    if (!post || !post.categories || post.categories.length <= 0) {
      return errorOrFalse(HttpErrors.BadRequest(), throwError);
    }
    return true;
  }
};

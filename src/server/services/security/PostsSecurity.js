const HttpErrors = require('http-errors');
const { errorOrFalse, noStack } = require('./SecurityHelper');
const SecurityService = require('./index');
const CategoryService = require('../blog/Category');


module.exports = class extends SecurityService {
  static onlyValidPost(req, throwError = true) {
    const post = req.body;
    if (!post || !post.categories || post.categories.length <= 0) {
      return errorOrFalse(HttpErrors.BadRequest(), throwError);
    }
    return true;
  }

  static async onlyQuestionOrModOrAdmin(req, throwError = true) {
    if (!this.onlyValidPost(req, throwError)) {
      return false;
    }
    if (this.onlyModOrAdmin(req, false)) {
      return true;
    }
    const post = req.body;
    const yourQuestionCategory = await CategoryService.first({
      where: { type: 'YourQuestion' }
    });
    const forbiddenCategories = await Promise.all(
      post.categories.map(category => CategoryService.first({
        where: {
          $and: [
            { type: category },
            { parent: { $ne: yourQuestionCategory._id } }
          ]
        }
      }))
    );
    if (forbiddenCategories.filter(cat => cat).length > 0) {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }
};

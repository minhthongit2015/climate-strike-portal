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
    const publicCategories = await CategoryService.list({
      where: {
        type: {
          $in: ['YourQuestion', 'CommunityShare', 'CommunityRecommed']
        }
      }
    });
    const isOK = post.categories.every(cat => publicCategories.find(pCat => pCat._id === cat._id));
    if (isOK) {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }
};

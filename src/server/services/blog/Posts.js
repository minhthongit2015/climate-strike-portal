
const { Post } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const CategoryService = require('./Category');
const ApiHelper = require('../../utils/ApiHelper');

module.exports = class extends CRUDService {
  static get model() {
    return Post;
  }

  static get populate() {
    return ['categories'];
  }

  static async resolveListOptions(opts = ApiHelper.listParams) {
    if (opts.category) {
      const parentCategory = await CategoryService.list({
        limit: 1,
        where: {
          type: opts.category
        }
      });
      const categories = [
        parentCategory[0]._id,
        ...parentCategory[0].children.map(category => category._id)
      ];
      if (typeof categories === 'object' && categories.length > 0) {
        opts.where = {
          categories: {
            $elemMatch: {
              $in: categories
            }
          }
        };
      }
    }
    return opts;
  }

  static async create(doc) {
    if (!doc.categories || doc.categories.length <= 0) {
      return null;
    }
    doc.categories = await CategoryService.list({
      where: {
        type: {
          $in: doc.categories
        }
      }
    }).then(categories => categories.map(category => category._id));
    const newDoc = super.create(doc);
    return newDoc;
  }
};

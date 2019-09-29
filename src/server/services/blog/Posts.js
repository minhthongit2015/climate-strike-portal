
const { Post } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const CategoryService = require('./Category');

module.exports = class extends CRUDService {
  static get model() {
    return Post;
  }

  static get populate() {
    return ['categories'];
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

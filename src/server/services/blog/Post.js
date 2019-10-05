
const { Post } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const CategoryService = require('./Category');
const ApiHelper = require('../../utils/ApiHelper');
const ImgurService = require('../../services/thirt-party/imgur');

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
      if (parentCategory.length <= 0) {
        return null;
      }
      const categories = [
        parentCategory[0]._id,
        ...parentCategory[0].children.map(category => category._id)
      ];
      if (categories && typeof categories === 'object' && categories.length > 0) {
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
    if (doc.preview) {
      doc.preview = await ImgurService.create(doc.preview, {
        title: doc.title
      });
    }
    doc.content = await this.postContentImageReplacer(doc.content);
    const newDoc = super.create(doc);
    return newDoc;
  }

  static async postContentImageReplacer(content) {
    const imgRegexp = /!\[(.+?)\]\((.+?)\)/g;
    const promises = [];
    async function replacer(match, imageName, imageBase64) {
      const promise = ImgurService.create(imageBase64, {
        name: imageName,
        title: imageName
      }).then(imageUrl => `![${imageName}](${imageUrl})`);
      promises.push(promise);
    }
    content.replace(imgRegexp, replacer);
    const data = await Promise.all(promises);
    return content.replace(imgRegexp, () => data.shift());
  }
};

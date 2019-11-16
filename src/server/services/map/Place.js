
const {
  Place,
  Strike, Activist, ActivistGroup, Action, Disaster, Extinction, Pollution
} = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const ImgurService = require('../thirt-party/imgur');

const PlaceTypes = [
  Place,
  Strike, Activist, ActivistGroup, Action, Disaster, Extinction, Pollution
];

module.exports = class extends CRUDService {
  static getModel(place) {
    if (!place || !place.__t) {
      return Place;
    }
    return PlaceTypes.find(type => type.modelName === place.__t) || Place;
  }

  static resolveListOptions(opts = ApiHelper.listParams) {
    ApiHelper.SortBuilder.add(opts, '-createdAt');
    return opts;
  }

  static create(place, user) {
    if (user) {
      place.author = ApiHelper.getId(user._id);
    }
    return super.create.call(this, place);
  }

  static async createOrUpdate(place, where) {
    if (place.cover) {
      place.cover = await ImgurService.create(place.cover, {
        title: place.name
      });
    }
    return super.createOrUpdate.call(this, place, where);
  }

  static get populate() {
    return ['author', 'user', 'post', 'members', 'leaders'];
  }
};

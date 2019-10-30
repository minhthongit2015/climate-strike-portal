
const {
  Place,
  Strike, Activist, ActivistGroup, Disaster, Extinction, Pollution
} = require('../../models/mongo');
const CRUDService = require('../CRUDService');

const PlaceTypes = [
  Place,
  Strike, Activist, ActivistGroup, Disaster, Extinction, Pollution
];

module.exports = class extends CRUDService {
  static getModel(place) {
    if (!place || !place.__t) {
      return Place;
    }
    return PlaceTypes.find(type => type.modelName === place.__t) || Place;
  }

  static get populate() {
    return ['user', 'members', 'leaders'];
  }
};

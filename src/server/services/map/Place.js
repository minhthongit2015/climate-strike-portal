
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
  static get model() {
    return Place;
  }

  static get populate() {
    return ['user', 'members', 'leaders'];
  }

  static appendRelationshipByUser(places, user) {
    if (!user) {
      return;
    }
    places.forEach((place) => {
      if (place.user && place.user._id === user._id) {
        place.owned = true;
      }
      if (place.members && place.members.find(member => member._id === user._id)) {
        place.joined = true;
      }
      if (place.leaders && place.leaders.find(leader => leader._id === user._id)) {
        place.isLeader = true;
      }
    });
  }

  static getServiceByPlaceType(place) {
    const model = PlaceTypes.find(type => type.modelName === place.__t) || Place;
    return this.clone(model);
  }

  static async create(place) {
    const serviceByPlace = this.getServiceByPlaceType(place);
    return serviceByPlace.create(place);
  }
};

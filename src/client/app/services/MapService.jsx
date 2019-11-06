import superrequest from '../utils/superrequest';
// import { ApiEndpoints } from '../utils/Constants';

// import MarkerWithInfo from '../components/map/marker-with-info/MarkerWithInfo';
import StoreMarker from '../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../components/map/user-marker/UserMarker';
import FarmMarker from '../components/map/farm-marker/FarmMarker';

import DisasterMarker from '../components/map/disaster-marker/DisasterMarker';
import ActionMarker from '../components/map/action-marker/ActionMarker';
import ActivistMarker from '../components/map/activist-marker/ActivistMarker';


export default class MapService {
  static async fetchPlaces() {
    // const endpoint = `${ApiEndpoints.map.entities.LIST}?sort=[["_id", 1]]`;
    return superrequest.get('/api/v1/map/places?sort=-createdAt')
      .then((res) => {
        if (!res || !res.data) {
          return [];
        }
        const places = res.data || [];
        return this.mapEntities(places);
      });
  }

  static async createPlace(place) {
    return superrequest.agentPost('/api/v1/map/places', place);
  }

  static async updatePlace(place) {
    const placeToUpdate = { ...place };
    delete placeToUpdate.marker;
    delete placeToUpdate.ref;
    return superrequest.agentPost('/api/v1/map/places', placeToUpdate);
  }

  static async deletePlace(place) {
    return superrequest.agentDelete(`/api/v1/map/places/${place._id}`);
  }

  static mapEntities(places) {
    places.forEach((place) => {
      place.marker = this.getMarkerByType(place.__t);
      if (place.__t === 'Garden') {
        place.picture = `https://graph.facebook.com/${place.socials.fb}`
          + '/picture?type=square&width=200&height=200';
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    return places;
  }

  static getMarkerByType(type) {
    switch (type) {
    case 'Garden':
      return UserMarker;
    case 'Farm':
      return FarmMarker;
    case 'FoodShop':
      return StoreMarker;
    case 'Disaster':
      return DisasterMarker;
    case 'Activist':
      return ActivistMarker;
    case 'Action':
      return ActionMarker;
    default:
      return FarmMarker;
    }
  }
}

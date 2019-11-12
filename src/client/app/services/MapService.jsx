import superrequest from '../utils/superrequest';
// import { ApiEndpoints } from '../utils/Constants';


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
      if (place.__t === 'Garden') {
        place.picture = `https://graph.facebook.com/${place.socials.fb}`
          + '/picture?type=square&width=200&height=200';
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    return places;
  }
}

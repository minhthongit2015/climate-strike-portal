import superrequest from '../utils/superrequest';
// import { ApiEndpoints } from '../utils/Constants';


export default class MapService {
  static async fetchPlace(placeOrder) {
    if (!placeOrder) return null;
    return superrequest.get(`/api/v1/map/places?limit=1&where={"baseOrder":${placeOrder}}`);
  }

  static extractPlaceOrder(url) {
    if (!url) return null;
    if (!Number.isNaN(+url)) return url;
    const urlz = new URL(url || window.location.href);
    return urlz.searchParams.get('place');
  }

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
    const paths = [];
    places.forEach((place) => {
      if (place.__t === 'Strike') {
        place.prev = places.find(pl => pl._id === place.prev);
        place.next = places.find(pl => pl._id === place.next);
      }
      if (place.__t === 'Garden') {
        place.picture = `https://graph.facebook.com/${place.socials.fb}`
          + '/picture?type=square&width=200&height=200';
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    places.filter(place => place.__t === 'Strike')
      .forEach((place, i, arr) => {
        if (place.next && arr.every(pl => !pl.next || pl.next._id !== place._id)) {
          const startPoint = this.generatePathEntity(place);
          paths.push(startPoint);
        }
      });
    return [...places, ...paths];
  }

  static generatePathEntity(place) {
    return {
      _id: `${place && place._id}${Math.round(Math.random() * 10000000)}`,
      __t: 'Path',
      name: place && place.name,
      path: this.getPathFromStart(place)
    };
  }

  static getPathFromStart(startPlace) {
    const path = [];
    let prev;
    while (startPlace) {
      startPlace.prev = prev;
      path.push(startPlace.position);
      prev = startPlace;
      startPlace = startPlace.next;
    }
    return path;
  }

  static openPlace(place) {
    if (!place) return;
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = urlParams.get('place');
    const {
      protocol, host, pathname, hash
    } = window.location;
    const url = `${protocol}//${host}${pathname}?place=${place.baseOrder}${hash}`;
    if (placeOrder) {
      window.history.replaceState({ placeOrder: place.baseOrder }, place.name, url);
    } else {
      this.pushState = true;
      window.history.pushState({ placeOrder: place.baseOrder }, place.name, url);
    }
  }

  static closePlace() {
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = urlParams.get('place');
    if (!placeOrder) {
      return;
    }
    const {
      protocol, host, pathname, hash
    } = window.location;
    const url = `${protocol}//${host}${pathname}${hash}`;
    if (this.pushState) {
      window.history.back();
    } else {
      window.history.pushState(null, 'Thế Giới Thực | Climate Strike Vietnam', url);
    }
  }

  static checkOpenCurrentPlace(places) {
    const urlParams = new URLSearchParams(window.location.search);
    const placeOrder = +urlParams.get('place');
    if (placeOrder) {
      const selectedPlace = places.find(place => place.baseOrder === placeOrder);
      if (selectedPlace) {
        selectedPlace.ref.open();
      }
    }
  }
}

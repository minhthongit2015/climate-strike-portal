

// import MarkerWithInfo from '../components/map/marker-with-info/MarkerWithInfo';
import StoreMarker from '../components/map/store-marker/StoreMarker';
import UserMarker from '../components/map/user-marker/UserMarker';
import FarmMarker from '../components/map/farm-marker/FarmMarker';

import DisasterMarker from '../components/map/disaster-marker/DisasterMarker';
import ActionMarker from '../components/map/action-marker/ActionMarker';
import ActivistMarker from '../components/map/activist-marker/ActivistMarker';
import ExtinctionMarker from '../components/map/extinction-marker/ExtinctionMarker';

export default class {
  static getMarkerByType(type) {
    switch (type) {
    case 'Disaster':
      return DisasterMarker;
    case 'Activist':
      return ActivistMarker;
    case 'Action':
      return ActionMarker;
    case 'Extinction':
      return ExtinctionMarker;
    default:
      return ActivistMarker;
    }
  }
}

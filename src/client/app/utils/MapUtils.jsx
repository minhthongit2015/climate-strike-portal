import DisasterMarker from '../components/map/disaster-marker/DisasterMarker';
import ActionMarker from '../components/map/action-marker/ActionMarker';
import ActivistMarker from '../components/map/activist-marker/ActivistMarker';
import ExtinctionMarker from '../components/map/extinction-marker/ExtinctionMarker';
import StrikeMarker from '../components/map/strike-marker/StrikeMarker';

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
    case 'Strike':
      return StrikeMarker;
    default:
      return null;
    }
  }
}

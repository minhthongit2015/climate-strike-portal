import React from 'react';
import MapService from '../../../services/MapService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlaceActions = this.handlePlaceActions.bind(this);
  }

  handlePlaceActions(event) {
    const { place, marker } = this.props;
    event.currentTarget.name = event.currentTarget.getAttribute('name');
    switch (event.currentTarget.name) {
    case 'delete-place':
      MapService.deletePlace(place);
      marker.rootMarker.setMap(null);
      break;
    case 'edit-place':
      MapService.updatePlace(place);
      break;
    default:
      break;
    }
  }

  render() {
    return (
      <div className="place-actions text-center">
        <div
          name="delete-place"
          className="btn btn-sm py-1 px-4 red lighten-2 text-white"
          onClick={this.handlePlaceActions}
        >Xóa
        </div>
        <div
          name="edit-place"
          className="btn btn-sm py-1 px-4 btn-default"
          onClick={this.handlePlaceActions}
        >Sửa
        </div>
      </div>
    );
  }
}

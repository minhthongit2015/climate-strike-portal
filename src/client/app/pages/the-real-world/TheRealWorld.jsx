/* eslint-disable no-param-reassign */
import React from 'react';
import BasePage from '../_base/BasePage';

import GGMap from '../../components/map/Map';
// import Polyline from '../../components/map/polyline/Polyline';
import MapService from '../../services/MapService';
import t from '../../languages';
import LeftToolBar from '../../components/map-tools/left-toolbar/LeftToolBar';
import UserService from '../../services/UserService';
import MapContextMenu from '../../components/map-tools/map-context-menu/MapContextMenu';
import RightToolBar from '../../components/map-tools/right-toolbar/RightToolBar';

export default class TheRealWorld extends BasePage {
  constructor(props) {
    super(props, t('pages.theRealWorld.title'));
    this.markers = new Set();
    this.lineRef = React.createRef();
    this.mapCtxMenuRef = React.createRef();
    this.onMapReady = this.onMapReady.bind(this);
    this.onMarkerRef = this.onMarkerRef.bind(this);
    this.renderMapElements = this.renderMapElements.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMoveMarker = this.onMoveMarker.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    this.handleLeftToolbarAction = this.handleLeftToolbarAction.bind(this);
    this.handleRightToolbarAction = this.handleRightToolbarAction.bind(this);

    this.state = {
      dirty: false,
      mapEntities: [],
      places: []
    };
    const center = [10.821897348888664, 106.68697200200597];
    this.defaultMapProps = {
      initialCenter: { lat: center[0], lng: center[1] },
      // zoom: 17
      zoom: 5
    };

    UserService.useUserState(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dirty) {
      nextState.dirty = false;
      return true;
    }
    return false;
  }

  onMapReady() {
    this.map.setMapTypeId(this.google.maps.MapTypeId.SATELLITE);
    this.map.setOptions({
      restriction: {
        latLngBounds: {
          north: 85.45, south: -85.45, west: -180, east: 180
        },
        strictBounds: true
      },
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: true,
      streetViewControl: true
    });
    this.fetchPlaces();
  }

  onMarkerRef(ref) {
    if (!ref) return;
    this.markers.add(ref);
  }

  async fetchPlaces() {
    // if (!this.stress) {
    //   this.stress = 0;
    // }
    const places = await MapService.fetchPlaces();
    // for (let i = 0; i < this.stress; i++) {
    //   places = places.concat(places);
    // }
    // console.log(this.stress, places.length);
    // this.stress++;
    this.setState({
      dirty: true,
      places
    });
  }

  refresh() {
    this.setState({ dirty: true });
  }

  onMapClicked(mapProps, map, event) {
    if (window.key.ctrl) {
      prompt('LatLng', `${event.latLng.lat()}, ${event.latLng.lng()}`);
    }
    if (window.key.alt) {
      //
    }
    if (window.key.shift) {
      return this.fetchPlaces();
    }
    return this.closeAll();
  }

  closeAll() {
    this.markers.forEach(marker => marker && marker.close());
  }

  // eslint-disable-next-line class-methods-use-this
  getContextOptions() {
    return [
      { label: '+ Thêm vùng thiên tai', value: 'add-Disaster' },
      { label: '+ Thêm cá nhân tham gia', value: 'add-Activist' }
    ];
  }

  handleRightClick(mapProps, map, event) {
    this.mapCtxMenuRef.current.open(event.wa, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleContextActions(event, option, data) {
    let newPlace;
    let promise;
    if (option.value.match(/add-(.+)/)) {
      newPlace = {
        __t: option.value.match(/add-(.+)/)[1],
        name: '',
        position: data
      };
      promise = MapService.createPlace(newPlace);
    }

    if (newPlace) {
      const newMarker = {
        ...newPlace,
        marker: MapService.getMarkerByType(newPlace.__t)
      };
      this.setState(prevState => ({
        dirty: true,
        places: prevState.places.concat(newMarker)
      }));
      promise.then((res) => {
        if (!res || !res.data) {
          // rollback
        }
        Object.assign(newMarker, res.data);
        this.refresh();
      });
    }
  }

  handleHotkeys(event) {
    if (event.key === 'Tab') {
      this.switchMarker();
      event.preventDefault();
    }
  }

  switchMarker() {
    const markers = [...this.markers];
    const focusedMarkerIndex = markers.findIndex(marker => marker.marker.isFocused);
    if (focusedMarkerIndex >= 0) {
      for (let i = focusedMarkerIndex + 1; (i % markers.length) !== focusedMarkerIndex; i++) {
        if (markers[i % markers.length].marker.isOpen) {
          markers[i % markers.length].marker.focus();
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleLeftToolbarAction(event) {
    const { name, value, checked } = event.currentTarget;
    switch (name) {
    case 'Activist':
      break;
    case 'Strike':
      break;
    case 'Extinction':
      break;
    case 'Disaster':
      break;
    case 'Pollution':
      break;
    case 'Community':
      break;
    default:
      break;
    }
    console.log(event);
  }

  // eslint-disable-next-line class-methods-use-this
  handleRightToolbarAction(event, place) {
    this.closeAll();
    place.ref.open();
  }

  // eslint-disable-next-line class-methods-use-this
  onMoveMarker(markerProps, map, event, place) {
    if (!window.confirm('Xác nhận di chuyển địa điểm này?')) {
      event.preventDefault();
      // place.ref.setPosition(place.ref.position);
      return;
    }
    place.position = event.latLng.toJSON();
    MapService.updatePlace(place);
  }

  // eslint-disable-next-line class-methods-use-this
  renderMapElements(props) {
    const { google, map } = props;
    if (!google || !map) return null;
    const baseProps = { google, map };
    this.google = google;
    this.map = map;

    const { places } = this.state;

    return (
      <React.Fragment>
        {places.map(place => (
          place.marker
            ? (
              <place.marker
                {...baseProps}
                key={place._id || Math.random()}
                ref={(ref) => { this.onMarkerRef(ref); place.ref = ref; }}
                entity={place}
                markerProps={
                  {
                    name: place.name,
                    position: place.position,
                    radius: place.radius,
                    draggable: UserService.isModOrAdmin,
                    onDragend: (markerProps, mapz, event) => {
                      this.onMoveMarker(markerProps, mapz, event, place);
                    }
                  }
                }
                windowProps={{}}
                name={place.name}
              />
            ) : null
        ))}
        {/* <Polyline
          {...baseProps}
          // key="polyline-01"
          ref={this.lineRef}
          path={places}
          color="#00ffff"
          opacity={0.8}
          width={2}
        /> */}
      </React.Fragment>
    );
  }

  render() {
    console.log('render "Pages/the-real-world/TheRealWorld.jsx"');
    const { places } = this.state;

    // if (!window.myGoogleMap) {
    window.myGoogleMap = (
      <GGMap
        google={this.props.google || window.google}
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
        onRightclick={this.handleRightClick}
        onReady={this.onMapReady}
        dirty={this.state.dirty}
      >
        <this.renderMapElements />
        {/* <LeftToolBar handler={this.handleLeftToolbarAction} /> */}
        <RightToolBar
          handler={this.handleRightToolbarAction}
          places={places}
        />
        <MapContextMenu
          ref={this.mapCtxMenuRef}
          options={this.getContextOptions()}
          handler={this.handleContextActions}
        />
      </GGMap>
    );
    // }

    return (
      <div {...this.props} onKeyDown={this.handleHotkeys}>
        {window.myGoogleMap}
      </div>
    );
  }
}

/* eslint-disable no-param-reassign */
import React from 'react';
import BasePage from '../_base/BasePage';

import GGMap from '../../components/map/Map';
// import Polyline from '../../components/map/polyline/Polyline';
import MapService from '../../services/MapService';
import t from '../../languages';

export default class TheRealWorld extends BasePage {
  constructor(props) {
    super(props, t('pages.theRealWorld.title'));
    this.markers = new Set();
    this.lineRef = React.createRef();
    this.onMapReady = this.onMapReady.bind(this);
    this.onMarkerRef = this.onMarkerRef.bind(this);
    this.renderMapElements = this.renderMapElements.bind(this);
    this.handleHotkeys = this.handleHotkeys.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMoveMarker = this.onMoveMarker.bind(this);

    this.state = {
      dirty: false,
      mapEntities: [],
      places: []
    };
    const center = [10.821897348888664, 106.68697200200597];
    this.defaultMapProps = {
      initialCenter: { lat: center[0], lng: center[1] },
      zoom: 17
    };
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
          north: 80, south: -80, west: -180, east: 180
        },
        strictBounds: true
      },
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: true,
      streetViewControl: true
    });
    this.loadMapObjects();
  }

  onMarkerRef(ref) {
    if (!ref) return;
    this.markers.add(ref);
  }

  async loadMapObjects() {
    const places = await MapService.fetchPlaces();
    this.setState({
      dirty: true,
      places
    });
  }

  onMapClicked(mapProps, map, event) {
    if (window.key.ctrl) {
      prompt('LatLng', `${event.latLng.lat()}, ${event.latLng.lng()}`);
    }
    if (window.key.shift) {
      return this.loadMapObjects();
    }
    return this.markers.forEach(marker => marker && marker.close());
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
  onMoveMarker(markerProps, map, event, place) {
    // this.setState((prevState) => {
    //   place.position = event.latLng.toJSON();
    //   // const marker = prevState.mapEntities.find(place => place.z);
    //   // const places = prevState.places.map(placez => placez.position);
    //   // if (places.length > 0) places.push(places[0]);
    //   // this.lineRef.current.setPath(places);
    //   return {
    //     // dirty: true,
    //     places
    //   };
    // });
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
                key={place.name}
                ref={(ref) => { this.onMarkerRef(ref); place.ref = ref; }}
                entity={place}
                markerProps={
                  {
                    name: place.name,
                    position: place.position,
                    draggable: true,
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
    // if (!window.myGoogleMap) {
    window.myGoogleMap = (
      <GGMap
        google={this.props.google || window.google}
        {...this.defaultMapProps}
        onClick={this.onMapClicked}
        onReady={this.onMapReady}
        dirty={this.state.dirty}
      >
        <this.renderMapElements />
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

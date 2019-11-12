/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './ActivistMarker.scss';

import { PlantPot1Src } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';

const CUSTOM_CLASS = 'activist';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;

export default class ActivistMarker extends Component {
  get uid() {
    return this.marker.uid;
  }

  get rootMarker() {
    return this.marker.rootMarker;
  }

  constructor(props) {
    super(props);
    this.myPeer = null;
    this.marker = null;
    this.onLoad = this.onLoad.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onLoad(ref) {
    this.marker = ref;
  }

  onClose() {
    if (this.myPeer) {
      this.myPeer.destroy();
      this.myPeer = null;
    }
  }

  open() {
    if (!this.marker) return;
    this.marker.open();
  }

  close() {
    if (!this.marker) return;
    this.marker.close();
  }

  toggle() {
    if (!this.marker) return;
    this.marker.toggle();
  }

  render() {
    const { entity: place = {} } = this.props;
    const {
      defaultAvatar = '/images/avatar.png',
      defaultCoverImage = '/images/cover-photo.jpg',
      user = {}
    } = place;
    const { name, socials: { facebook } = {} } = user;
    const avatar = facebook && `https://graph.facebook.com/${facebook}/picture?type=square&width=200&height=200`;

    return (
      <MarkerWithInfo
        {...this.props}
        ref={this.onLoad}
        onClose={this.onClose}
        customMarkerClass={CUSTOM_MARKER_CLASS}
        customWindowClass={CUSTOM_WINDOW_CLASS}
        iconSrc={PlantPot1Src}
      >
        <div className="marker__header">
          <div className="marker__cover-photo" style={{ backgroundImage: `url(${defaultCoverImage})` }}>
            <img alt="" src={defaultCoverImage} />
          </div>
          <div className="marker__avatar">
            <img alt="" src={avatar || defaultAvatar} />
          </div>
        </div>
        <div className="marker__profile px-3 pb-3">
          <div className="marker__profile__name">{name}</div>
          <div className="marker__profile__description">cá nhân hoạt động vì môi trường</div>
          <hr className="my-2 mx-5" />
          <PlaceActions place={place} marker={this} />
        </div>
      </MarkerWithInfo>
    );
  }
}

ActivistMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

ActivistMarker.defaultProps = {
  iconSrc: PlantPot1Src,
  entity: {}
};

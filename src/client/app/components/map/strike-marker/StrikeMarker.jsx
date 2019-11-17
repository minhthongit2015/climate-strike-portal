/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './StrikeMarker.scss';
import { FlagSrc } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';


export default class StrikeMarker extends MarkerWithInfo {
  static get customClass() {
    return 'strike';
  }

  renderContent() {
    const { entity: place = {} } = this.props;
    const {
      cover,
      description,
      avatar,
      name
    } = place;
    const defaultDescription = 'Cuộc diễu hành kêu gọi chống biến đổi khí hậu';
    const defaultCover = '/images/cover-photo.jpg';
    const defaultAvatar = 'https://cms.frontpagemag.com/sites/default/files/styles/article_full/public/uploads/2019/11/gt.jpg?itok=wsbc5NVv';

    return (
      <div>
        <div className="marker__header">
          <div className="marker__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
            <img alt="" src={cover || defaultCover} />
          </div>
          <div className="marker__avatar">
            <img alt="" src={avatar || defaultAvatar} />
          </div>
        </div>
        <div className="marker__profile px-3 pb-3">
          <div className="marker__profile__name">{name || 'Greta Thunberg'}</div>
          <div className="marker__profile__description">{description || defaultDescription}</div>
          <div className="my-2 text-center">
            <div className="btn btn-sm py-1 px-4 btn-default">{'< Trước'}</div>
            <div className="btn btn-sm py-1 px-4 btn-default">{'Tiếp >'}</div>
          </div>
          <hr className="my-2" />
          <PlaceActions place={place} marker={this} />
        </div>
      </div>
    );
  }
}

StrikeMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

StrikeMarker.defaultProps = {
  iconSrc: FlagSrc,
  entity: {}
};

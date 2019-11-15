import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './DisasterMarker.scss';

import { ForestFireSrc as DisasterIconSrc } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import PostService from '../../../services/PostService';

const CUSTOM_CLASS = 'disaster';
const CUSTOM_MARKER_CLASS = `${CUSTOM_CLASS}-marker`;
const CUSTOM_WINDOW_CLASS = `${CUSTOM_CLASS}-info-window`;


export default class DisasterMarker extends Component {
  get uid() {
    return this.marker.uid;
  }

  get rootMarker() {
    return this.marker.rootMarker;
  }

  constructor(props) {
    super(props);
    this.marker = null;
    this.onLoad = this.onLoad.bind(this);
    this.handleGoToPost = this.handleGoToPost.bind(this);
  }

  onLoad(ref) {
    this.marker = ref;
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

  refresh() {
    this.marker.refresh();
  }

  remove() {
    this.marker.remove();
  }

  // eslint-disable-next-line class-methods-use-this
  handleGoToPost(event, post) {
    if (event.ctrlKey || event.which !== 1) {
      return;
    }
    event.preventDefault();

    const url = PostService.buildPostUrl(post, { relative: true });
    window.realWorldHistory.push(url);
  }

  render() {
    const {
      name, description, entity: place = {}, events, ...restProps
    } = this.props;
    const { post = {} } = place;
    const { title, summary, preview } = post;

    return (
      <MarkerWithInfo
        {...restProps}
        ref={this.onLoad}
        onOpen={this.onOpen}
        customMarkerClass={CUSTOM_MARKER_CLASS}
        customWindowClass={CUSTOM_WINDOW_CLASS}
      >
        <div className="marker__header mx-3 mt-3">
          <div className="marker__title">{name || title}</div>
          <img className="marker__banner" src={preview} alt="" />
        </div>
        <div className="marker__body mb-3">
          <section className="marker__section marker__post">
            {name && <div className="marker__section__header py-3 color-default">{title}</div>}
            <div className="marker__section__body">
              <div className="marker__section__summary">{summary}</div>
              <div className="marker__section__actions">
                <div>
                  {/* <button type="button" className="btn btn-sm btn-default px-3">
                    <i className="fab fa-font-awesome-flag" /> Chia sẻ
                  </button> */}
                  <a href={PostService.buildPostUrl(post)}>
                    <button
                      type="button"
                      className="btn btn-sm btn-default px-3"
                      onClick={event => this.handleGoToPost(event, post)}
                    >
                      <i className="far fa-paper-plane" /> Xem chi tiết
                    </button>
                  </a>
                </div>
                <PlaceActions place={place} marker={this} />
              </div>
            </div>
          </section>
          <section className="marker__section">
            {events && events.map(event => (
              <div key={event._id}>
                <div className="marker__section__header">{event.title}</div>
                <div className="marker__section__body">
                  {event.title}
                </div>
              </div>
            ))}
          </section>
        </div>
      </MarkerWithInfo>
    );
  }
}

DisasterMarker.propTypes = {
  iconSrc: PropTypes.string
};

DisasterMarker.defaultProps = {
  iconSrc: DisasterIconSrc
};

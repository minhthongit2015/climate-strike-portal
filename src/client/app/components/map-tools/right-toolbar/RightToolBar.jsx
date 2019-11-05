import React from 'react';
import { MDBBtn } from 'mdbreact';
import classnames from 'classnames';
import '../toolbar/Toolbar.scss';
import './RightToolbar.scss';
import { getAutoDispatcher } from '../../Helper';
import { IconPlus } from '../../../../assets/icons';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.autoDispatcher = getAutoDispatcher(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const {
      className, handler, places, ...restProps
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={classnames(
          `map-toolbar right-toolbar ${className || ''}`,
          { open: isOpen }
        )}
        {...restProps}
      >
        <div className="d-flex justify-content-end align-items-center">
          {isOpen && (
            <div className="map-toolbar__title mx-2">Tin tức mới</div>
          )}
          <MDBBtn
            className="map-toolbar__toggle map-toolbar__btn"
            color="none"
            onClick={this.toggle}
            title="đóng [Tab]"
          >
            <IconPlus width="100%" height="100%" />
          </MDBBtn>
        </div>
        {places && (
          <div className="map-toolbar__list d-flex flex-column flex-fill">
            {places.map(place => (
              <div
                key={place._id}
                className="map-toolbar__list__item"
                tabIndex="-1"
              >
                <div><TimeAgo time={place.createdAt} /></div>
                <div
                  className="map-toolbar__list__link"
                  tabIndex="-1"
                  onClick={event => this.autoDispatcher(event, place)}
                >
                  {place.name || (place.post && place.post.title)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

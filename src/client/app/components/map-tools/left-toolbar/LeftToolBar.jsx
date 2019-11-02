import React from 'react';
import { MDBBtn } from 'mdbreact';
import classnames from 'classnames';
import './LeftToolbar.scss';
import { getAutoDispatcher } from '../../Helper';
import { IconPlus } from '../../../../assets/icons';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.autoDispatcher = getAutoDispatcher(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { className, handler, ...restProps } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={classnames(
          `map-toolbar left-toolbar ${className || ''}`,
          { open: isOpen }
        )}
        {...restProps}
      >
        <MDBBtn className="map-toolbar__toggle map-toolbar__btn" color="none" onClick={this.toggle}>
          <IconPlus width="100%" height="100%" />
        </MDBBtn>
        <div className="map-toolbar__list">
          <div className="map-toolbar__list__item">
            <MDBBtn
              color="none"
              onClick={event => this.autoDispatcher(event, 'rise-your-voice')}
              className="map-toolbar__list__item__icon map-toolbar__btn"
            >
              <span>+</span>
              <div className="map-toolbar__list__item__label">Thêm điểm nóng</div>
            </MDBBtn>
          </div>
        </div>
      </div>
    );
  }
}

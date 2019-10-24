import React from 'react';
import { MDBBtn } from 'mdbreact';
import './LeftToolbar.scss';
import { getAutoDispatcher } from '../../Helper';

export default (props) => {
  if ((props.props && !props.props.handler)
    || (!props.props && !props.handler)) {
    console.log('missing handler');
  }
  const autoDispatcher = getAutoDispatcher(props);

  return (
    <div className="map-toolbar left-toolbar">
      <MDBBtn size="sm" onClick={event => autoDispatcher(event, 'rise-your-voice')}>Rise your voice!</MDBBtn>
    </div>
  );
};

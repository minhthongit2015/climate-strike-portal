import React from 'react';


export default props => (
  <React.Fragment>
    {props.icon ? (
      <div
        style={{
          width: '100%',
          height: '0',
          paddingTop: `${(props.ratio && props.ratio * 100) || 100}%`,
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          padding: '10%'
        }}
        >
          <props.icon style={{ maxWith: '100%', maxHeight: '100%' }} />
        </div>
      </div>
    ) : (
      <div
        style={{
          width: '100%',
          height: '0',
          paddingTop: `${(props.ratio && props.ratio * 100) || 100}%`,
          background: `url("${props.src}") center center/${props.type || 'cover'} no-repeat`
        }}
        {...props}
      />
    )}
  </React.Fragment>
);

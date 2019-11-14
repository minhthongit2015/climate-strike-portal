import React from 'react';

export default (props) => {
  const { children } = props;
  return (
    <div className="squarebox">
      <svg viewBox="0 0 100 100">
        <rect width="100px" height="100px" fill="#7d2" />
      </svg>
      <div />
    </div>
  );
}
;
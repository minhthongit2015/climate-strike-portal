import React from 'react';

export default React.memo(props => (
  <div
    {...props}
    className="fb-share-button"
    data-href={props.url}
    data-layout="button_count"
    data-size="large"
  >
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={props.url}
      className="fb-xfbml-parse-ignore"
    >chia sẻ
    </a>
  </div>
));

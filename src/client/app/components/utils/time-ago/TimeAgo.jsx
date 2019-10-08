import React from 'react';
import moment from 'moment';

moment.locale('vi');

function getCustomTime(time) {
  return time.format('HH:mm - DD/MM/YYYY');
}

function getIntervalByContext(time) {
  return 1000;
}

export default (props) => {
  const time = moment(props.time);
  const [value, forceUpdate] = React.useState(true);
  React.useEffect(() => {
    const intervalHandle = setInterval(() => {
      forceUpdate(!value);
    }, getIntervalByContext(time));
    return () => {
      clearInterval(intervalHandle);
    };
  });
  return (
    <span title={getCustomTime(time)} className="text-monospace text-muted">
      <i className="far fa-clock" /> {time.fromNow()}
    </span>
  );
};

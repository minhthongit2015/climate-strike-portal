import React from 'react';
import moment from 'moment';

moment.locale('vi');

function getCustomTime(time) {
  return time.format('DD/MM/YYYY HH:mm');
}

export default (props) => {
  const [value, forceUpdate] = React.useState(true);
  React.useEffect(() => {
    const intervalHandle = setInterval(() => {
      forceUpdate(!value);
    }, 1000);
    return () => {
      clearInterval(intervalHandle);
    };
  });
  const time = moment(props.time);
  return <span title={getCustomTime(time)}>{time.fromNow()}</span>;
};

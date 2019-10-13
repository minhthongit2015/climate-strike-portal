import React from 'react';
import { Circle } from 'rc-progress';
import { Motion, spring } from 'react-motion';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  setOpen(isOpen) {
    this.setState({
      isOpen
    });
  }

  render() {
    const {
      icon, percent = 0, progressProps = {}, ...restProps
    } = this.props;
    const { isOpen } = this.state;
    const speedControl = { stiffness: 14, damping: 20 };

    return (
      <Motion
        defaultStyle={{ percent: 0 }}
        style={{ percent: spring(isOpen ? percent : 0, speedControl) }}
      >
        {value => (
          <div style={{ position: 'relative' }} {...restProps}>
            <Circle
              percent={value.percent}
              strokeWidth="4"
              trailWidth="4"
              strokeColor="#ffd57f"
              trailColor="#fffdd8"
              {...progressProps}
            />
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: '70%',
              height: '70%'
            }}
            >
              {icon}
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

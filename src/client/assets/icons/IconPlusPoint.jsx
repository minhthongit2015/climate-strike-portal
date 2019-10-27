import React from 'react';
import classnames from 'classnames';
import './IconPlusPoint.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.oldPoint = null;
    this.animating = false;
  }

  handleAnimationEnd() {
    this.animating = false;
    this.forceUpdate();
  }

  render() {
    const { className, point, ...restProps } = this.props;
    const isChange = this.oldPoint !== point;
    const isFirstChange = this.oldPoint == null;
    let isAnimate = isChange && !isFirstChange;
    const diff = point - this.oldPoint;

    if (this.animating) {
      isAnimate = false;
      setTimeout(() => {
        this.animating = false;
        this.forceUpdate();
      }, 10);
    } else if (isChange) {
      this.oldPoint = point;
    }
    this.animating = isAnimate;

    return (
      <div
        className={classnames(
          className,
          'icon-plus-point',
          { animate: isAnimate, negative: diff < 0 }
        )}
        onAnimationEnd={this.handleAnimationEnd}
        {...restProps}
      >
        {(diff < 0 ? '' : '+') + diff}
      </div>
    );
  }
}

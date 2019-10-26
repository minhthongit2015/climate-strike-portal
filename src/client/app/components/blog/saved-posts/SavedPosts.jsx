import React from 'react';
import PostList from '../post-list/PostList';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleActions = this.handleActions.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleActions(event, action) {
    console.log(action);
  }

  render() {
    return (
      <PostList
        {...this.props}
        handleActions={this.handleActions}
        hasPermission={false}
      />
    );
  }
}

import React from 'react';
import InfinitePostList from '../../../components/blog/infinite-post-list/InfinitePostList';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.category = 'EarthPicture';
  }

  render() {
    return (
      <InfinitePostList
        {...this.props}
        category={this.category}
      />
    );
  }
}

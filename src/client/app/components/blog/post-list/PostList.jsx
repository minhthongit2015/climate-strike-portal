import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'mdbreact';

const { Shuffle } = window;

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = null;
  }

  onContainerRef(ref) {
    this.containerRef = ref;
    this.shuffle = new Shuffle(this.containerRef, '.post-wrapper');
  }

  render() {
    const { children } = this.props;
    const { posts = children } = this.props;
    return (
      <Row>
        {posts && posts.map(post => (
          <Col key={post.key} col="4" className="post-wrapper">{post}</Col>
        ))}
      </Row>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array
};

PostList.defaultProps = {
  posts: undefined
};

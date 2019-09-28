import React from 'react';
import PostList from '../../../../components/blog/post-list/PostList';
import supperrequest from '../../../../utils/superrequest';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    return supperrequest.get('/api/v1/blog/posts')
      .then((res) => {
        if (!res.ok) {
          return;
        }
        this.setState({
          posts: res.data
        });
      });
  }

  refresh() {
    this.fetchPosts();
  }

  render() {
    const { posts } = this.state;

    return (
      <PostList {...this.props} posts={posts} />
    );
  }
}

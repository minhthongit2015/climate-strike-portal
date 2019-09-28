import React from 'react';
import PostList from '../../../../components/blog/post-list/PostList';
import Post from '../../../../components/blog/post/Post';


export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [
        { title: 'Post 1', description: 'post 1', preview: '123' },
        { title: 'Post 2', description: 'post 2', preview: '123' },
        { title: 'Post 3', description: 'post 3', preview: '123' },
        { title: 'Post 4', description: 'post 4', preview: '123' }
      ]
    };
  }

  render() {
    const { posts } = this.state;

    return (
      <PostList>
        {posts.map(post => <Post key={post.title} post={post} />)}
      </PostList>
    );
  }
}

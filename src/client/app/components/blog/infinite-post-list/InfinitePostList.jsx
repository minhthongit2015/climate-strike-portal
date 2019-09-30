import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LeafLoading from '../../utils/loadings/LeafLoading';
import PostList from '../post-list/PostList';
import superrequest from '../../../utils/superrequest';

export default class InfinitePostList extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.page = 0;
    this.state = {
      posts: [],
      hasMore: true
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    const { category, postsPerPage = 4 } = this.props;
    const limit = postsPerPage;
    const offset = this.page * limit;

    return superrequest.get(`/api/v1/blog/posts?category=${category}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        if (!res || !res.ok) {
          // If it has some error, then try to fetch again after 3s
          setTimeout(() => {
            this.fetchPosts();
          }, 3000);
          return;
        }
        if (this.state.hasMore) {
          this.page++;
        }
        if (res.data.length > 0) {
          this.setState(prevState => ({
            posts: prevState.posts.concat(res.data),
            hasMore: res.data.length >= limit
          }));
        } else {
          this.setState({
            hasMore: false
          });
        }
      });
  }

  renderLoading() {
    const { loadingText = 'đang tải các bài viết...' } = this.props;
    return (
      <div className="overlapable mt-5" style={{ width: '100%', height: '200px' }}>
        <LeafLoading text={loadingText} overlaping />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderEnd() {
    const knowAllMsg = 'bạn đã biết tất cả những gì mình biết...';
    const noPostMsg = 'chưa có bài viết nào được đăng...';
    const isNoPost = this.state.posts.length === 0;
    return (
      <div className="text-center">
        <hr className="w-75 mt-5" />
        <div className="my-5 text-monospace text-black-50 font-weight-bold">
          {isNoPost ? noPostMsg : knowAllMsg}
        </div>
      </div>
    );
  }

  render() {
    const { posts } = this.state;

    return (
      <InfiniteScroll
        dataLength={posts.length}
        next={this.fetchPosts}
        scrollThreshold="200px"
        scrollableTarget="sidebar-layout__content"
        style={{ overflowX: 'hidden' }}
        hasMore={this.state.hasMore}
        loader={this.renderLoading()}
        endMessage={this.renderEnd()}
      >
        <PostList posts={posts} />
      </InfiniteScroll>
    );
  }
}

// import React from 'react';
import superrequest from '../utils/superrequest';
import GlobalState from '../utils/GlobalState';

const UNREAD_POSTS_STATE_NAME = 'unreadPosts';

export default class {
  static get unreadPosts() {
    return GlobalState.unreadPosts;
  }

  static async checkUnreadPosts(force = false) {
    if (!force && this.unreadPosts != null) {
      return this.unreadPosts;
    }
    return superrequest.agentGet('/api/v1/blog/posts/unread-posts')
      .then((unreadPosts) => {
        GlobalState.setVolativeState(UNREAD_POSTS_STATE_NAME, unreadPosts);
      });
  }

  static useUnreadPostsState(component) {
    this.checkUnreadPosts();
    return GlobalState.useState(UNREAD_POSTS_STATE_NAME, null, component);
  }
}

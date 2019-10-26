import React from 'react';
import superrequest from '../utils/superrequest';
import PageDialogService from './PageDialogService';
import InfinitePostList from '../components/blog/infinite-post-list/InfinitePostList';
import DeepMessage from '../components/utils/messages/DeepMessage';


const defaultState = { isSavedPostsPage: true };

export default class extends PageDialogService {
  static shouldOpenWithState(state) {
    return state && state.isSavedPostsPage != null;
  }

  static renderPageDialog() {
    return (
      <React.Fragment>
        <DeepMessage>Bài Viết Đã Lưu</DeepMessage>
        <InfinitePostList
          noPostMsg="chưa có bài viết nào được lưu"
          endMessage=""
          fetchPosts={this.fetchSavedPosts}
          allSmall
        />
      </React.Fragment>
    );
  }

  static async openNoHistory() {
    this.show({ isSavedPostsPage: true });
  }

  static openSavedPostsInCurrentHistory() {
    this.openInCurrentHistory({
      url: this.getSavePageUrl(),
      title: this.getPageTitle(),
      state: defaultState
    });
  }

  static openSavedPostsInNewHistory() {
    this.openInNewHistory({
      url: this.getSavePageUrl(),
      title: this.getPageTitle(),
      state: defaultState
    });
  }

  static async fetchSavedPosts() {
    return superrequest.get('/api/v1/blog/saved-posts')
      .then((res) => {
        if (res && res.data) {
          res.data.forEach((savedPost) => {
            savedPost.isSaved = true;
          });
        }
        return res;
      });
  }

  static getSavePageUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('saved-posts', 'open');
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, pathname, hash
    } = window.location;
    return `${protocol}//${host}${pathname}${search}${hash}`;
  }

  static getPageTitle() {
    return 'Bài viết đã lưu | Climate Strike Vietnam';
  }
}

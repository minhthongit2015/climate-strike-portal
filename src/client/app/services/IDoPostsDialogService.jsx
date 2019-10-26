import React from 'react';
import superrequest from '../utils/superrequest';
import PageDialogService from './PageDialogService';
import InfinitePostList from '../components/blog/infinite-post-list/InfinitePostList';
import DeepMessage from '../components/utils/messages/DeepMessage';


const defaultState = { isIDoPage: true };

export default class extends PageDialogService {
  static shouldOpenWithState(state) {
    return state && state.isIDoPage != null;
  }

  static renderPageDialog() {
    return (
      <React.Fragment>
        <DeepMessage>
          <span role="img" aria-label="i-do" aria-labelledby="i-do">
            Những Việc Tôi Sẽ Làm! ✊
          </span>
        </DeepMessage>
        <InfinitePostList
          noPostMsg="chưa có hành động nào được chọn"
          endMessage=""
          fetchPosts={this.fetchIDoPosts}
          allSmall
        />
      </React.Fragment>
    );
  }

  static async openNoHistory() {
    this.show(defaultState);
  }

  static openIDoPostsInCurrentHistory() {
    this.openInCurrentHistory({
      url: this.getSavePageUrl(),
      title: this.getPageTitle(),
      state: defaultState
    });
  }

  static openIDoPostsInNewHistory() {
    this.openInNewHistory({
      url: this.getSavePageUrl(),
      title: this.getPageTitle(),
      state: defaultState
    });
  }

  static async fetchIDoPosts() {
    return superrequest.get('/api/v1/blog/i-will-do-this')
      .then((res) => {
        if (res && res.data) {
          res.data.forEach((savedPost) => {
            savedPost.iWillDoThis = true;
          });
        }
        return res;
      });
  }

  static getSavePageUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('i-will-do-this', 'yes');
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, pathname, hash
    } = window.location;
    return `${protocol}//${host}${pathname}${search}${hash}`;
  }

  static getPageTitle() {
    return 'Điều Tôi Sẽ Làm | Climate Strike Vietnam';
  }
}

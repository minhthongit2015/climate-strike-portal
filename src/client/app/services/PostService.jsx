import React from 'react';
import superrequest from '../utils/superrequest';
import PageDialogService from './PageDialogService';
import PostDetails from '../components/blog/post-details/PostDetails';
import UserService from './UserService';

export default class {
  static init() {
    window.onpopstate = (event) => {
      if (event.state && event.state.baseOrder) {
        this.showPost(event.state);
      } else {
        PageDialogService.close();
      }
    };
  }

  // Direct access
  static async openPostDetailsCurrentTab(postOrder) {
    this.fetchPost(postOrder).then((res) => {
      if (res && res.data) {
        const post = res.data[0];
        this.showPost(post);
        PageDialogService.replaceHistory({
          url: this.buildPostUrl(post),
          title: post.title,
          state: post
        });
      }
    });
  }

  // Open when click to a post
  static openPostDetailsDialog(post) {
    this.showPost(post);
    PageDialogService.pushHistory({
      url: this.buildPostUrl(post),
      title: post.title,
      state: post
    });
  }

  static async fetchPost(postOrder) {
    return superrequest.get(`/api/v1/blog/posts?limit=1&where={"baseOrder":${postOrder}}`);
  }

  static showPost(post) {
    PageDialogService.setContent(<PostDetails {...post} />);
    PageDialogService.open();
  }

  static buildPostUrl(post) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('hashtag', post.baseOrder);
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, pathname, hash
    } = window.location;
    return `${protocol}//${host}${pathname}${search}${hash}`;
  }

  static refreshCache() {
    return superrequest.agent.get('https://graph.facebook.com').query({
      id: window.location.href,
      scrape: true,
      access_token: UserService.fbAccessToken
    });
  }
}

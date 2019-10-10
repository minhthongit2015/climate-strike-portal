import React from 'react';
import superrequest from '../utils/superrequest';
import DialogService from './DialogService';
import PostDetails from '../components/blog/post/PostDetails';
import UserService from './UserService';

export default class {
  static init() {
    window.onpopstate = (event) => {
      if (event.state && event.state.baseOrder) {
        this.showPost(event.state);
      } else {
        DialogService.close();
      }
    };
  }

  // Direct access
  static async fetchAndShowPost(postOrder) {
    this.fetchPost(postOrder).then((res) => {
      if (res && res.data) {
        this.showPost(res.data[0]);
        window.history.replaceState(res.data[0], document.title, window.location.href);
      }
    });
  }

  static async fetchPost(postOrder) {
    return superrequest.get(`/api/v1/blog/posts?limit=1&where={"baseOrder":${postOrder}}`);
  }

  // Open when click to a post
  static async openPostDetails(post) {
    DialogService.pushHistory({
      url: this.buildPostUrl(post),
      title: post.title,
      state: post
    });
    this.showPost(post);
  }

  static showPost(post) {
    DialogService.setContent(<PostDetails {...post} />);
    DialogService.open();
  }

  static buildPostUrl(post) {
    return `${window.location.href}?hashtag=${post.baseOrder}`;
  }

  static refreshCache() {
    return superrequest.agent.get('https://graph.facebook.com').query({
      id: window.location.href,
      scrape: true,
      access_token: UserService.fbAccessToken
    });
  }
}

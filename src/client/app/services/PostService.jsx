import React from 'react';
import superrequest from '../utils/superrequest';
import DialogService from './DialogService';
import PostDetails from '../components/blog/post/PostDetails';

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
    superrequest.agent.get('/api/v1/blog/posts/refresh-cache').query({
      url: window.location.href
    }).then(res => console.log(res));
  }
}

import superrequest from '../utils/superrequest';
import PageDialogService from './PageDialogService';
import UserService from './UserService';

export default class extends PageDialogService {
  static async fetchPost(postOrder) {
    return superrequest.get(`/api/v1/blog/posts?limit=1&where={"baseOrder":${postOrder}}`);
  }

  static buildPostUrl(post, keepQuery = false) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('hashtag', post.baseOrder);
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, pathname, hash
    } = window.location;
    return keepQuery
      ? `${protocol}//${host}${pathname}${search}${hash}`
      : `${protocol}//${host}${pathname}?hashtag=${post.baseOrder}`;
  }

  static refreshCache() {
    return superrequest.agent.get('https://graph.facebook.com').query({
      id: window.location.href,
      scrape: true,
      access_token: UserService.fbAccessToken
    });
  }
}

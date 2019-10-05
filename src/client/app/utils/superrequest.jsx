
import superagent from 'superagent';
import superws from './superws';
import Config from '../config';

export default class {
  static mapUrl(url) {
    if (url.startsWith('/')) {
      return `${Config.httpEndpoint}${url}`;
    }
    return url;
  }

  static setAccessToken(token) {
    this._accessToken = token;
  }

  static get accessToken() {
    return this._accessToken;
  }

  static get baseHeaders() {
    return { AccessToken: this.accessToken };
  }

  static get ws() { return superws; }

  static get agent() { return superagent; }

  static async emit(...args) {
    return superws.emit(...args);
  }

  static async get(url) {
    if (superws.connected) return superws.get(url, this.baseHeaders);
    return this.agentGet(url);
  }

  static async agentGet(url) {
    return superagent.get(this.mapUrl(url)).withCredentials()
      .set('AccessToken', this.accessToken).then(res => res.body);
  }

  static async post(url, body) {
    if (superws.connected) return superws.post(url, body, this.baseHeaders);
    return this.agentPost(url, body);
  }

  static async agentPost(url, body) {
    return superagent.post(this.mapUrl(url)).withCredentials()
      .set('AccessToken', this.accessToken).send(body)
      .then(res => res.body);
  }

  static async put(url, body) {
    if (superws.connected) return superws.put(url, body, this.baseHeaders);
    return this.agentPut(url, body);
  }

  static async agentPut(url, body) {
    return superagent.put(this.mapUrl(url)).withCredentials()
      .set('AccessToken', this.accessToken).send(body)
      .then(res => res.body);
  }

  static async patch(url, body) {
    if (superws.connected) return superws.patch(url, body, this.baseHeaders);
    return this.agentPatch(url, body);
  }

  static async agentPatch(url, body) {
    return superagent.patch(this.mapUrl(url)).withCredentials()
      .set('AccessToken', this.accessToken).send(body)
      .then(res => res.body);
  }

  static async delete(url) {
    if (superws.connected) return superws.delete(url, this.baseHeaders);
    return this.agentDelete(url);
  }

  static async agentDelete(url) {
    return superagent.delete(this.mapUrl(url)).withCredentials()
      .set('AccessToken', this.accessToken).then(res => res.body);
  }
}

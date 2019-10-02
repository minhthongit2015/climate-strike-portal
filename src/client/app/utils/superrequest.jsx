
import superagent from 'superagent';
import superws from './superws';

export default class {
  static set accessToken(token) {
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
    if (superws.connected) return this.socket.emit(...args);
    return null;
  }

  static async get(url) {
    if (superws.connected) return superws.get(url, this.baseHeaders);
    return superagent.get(`http://localhost:5000${url}`).withCredentials()
      .set('AccessToken', this.accessToken).then(res => res.body);
  }

  static async post(url, body) {
    if (superws.connected) return superws.post(url, body, this.baseHeaders);
    return superagent.post(url).withCredentials()
      .set('AccessToken', this.accessToken).send(body);
  }

  static async put(url, body) {
    if (superws.connected) return superws.put(url, body, this.baseHeaders);
    return superagent.put(url).withCredentials()
      .set('AccessToken', this.accessToken).send(body);
  }

  static async delete(url) {
    if (superws.connected) return superws.delete(url, this.baseHeaders);
    return superagent.delete(url).withCredentials()
      .set('AccessToken', this.accessToken).then(res => res.body);
  }
}

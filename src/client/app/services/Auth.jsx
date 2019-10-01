import superagent from 'superagent';
import { apiEndpoints } from '../utils/Constants';
import FbService from './FbService';

export default class Auth {
  static signin(username, password) {
    return superagent.post(apiEndpoints.user.SIGN_IN).withCredentials()
      .send({ username, password });
  }

  static async signout() {
    return this.fbLogout();
  }

  static async fbLogin() {
    return FbService.login();
  }

  static async fbLogout() {
    return FbService.logout();
  }
}

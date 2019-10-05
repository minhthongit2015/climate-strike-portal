import GlobalState from '../utils/GlobalState';
import superrequest from '../utils/superrequest';
import { ApiEndpoints } from '../utils/Constants';

export const UserObjectKeys = {
  fbUser: 'fbUser',
  fbProfile: 'fbProfile',
  user: 'user'
};

export default class UserService {
  static async fetchUser() {
    if (!this.fbUser) {
      return this.clearUser();
    }
    return superrequest.agentGet(ApiEndpoints.user.FB_LOGIN)
      .then((response) => {
        if (this.fbUser && response && response.ok) {
          this.setUser(response.data);
        } else {
          this.clearUser();
        }
      });
  }

  static setUser(user) {
    this.user = user;
    GlobalState.setState(UserObjectKeys.user, user);
  }

  static clearUser() {
    this.user = null;
    GlobalState.setState(UserObjectKeys.user, null);
  }

  static useUserState(component) {
    GlobalState.useState(UserObjectKeys.user, null, component);
  }

  static async logout() {
    superrequest.agentGet(ApiEndpoints.user.SIGN_OUT)
      .then(() => {
        this.clearUser();
      });
  }

  // ---

  static get fbUserId() {
    return this.fbUser ? this.fbUser.authResponse.userID : null;
  }

  static get fbAccessToken() {
    return this.fbUser ? this.fbUser.authResponse.accessToken : null;
  }

  static get fbAvatarSrc() {
    let fbId = null;
    if (this.user) {
      fbId = this.user.socials.facebook;
    }
    if (this.fbUser) {
      fbId = this.fbUser.authResponse.userID;
    }
    return fbId
      ? `https://graph.facebook.com/${fbId}/picture?type=square&width=200&height=200`
      : '/images/default-avatar.jpg';
  }

  // ---

  static setFbUser(fbUser) {
    this.fbUser = fbUser;
    superrequest.setAccessToken(fbUser.authResponse.accessToken);
    GlobalState.setState(UserObjectKeys.fbUser, fbUser);
  }

  static clearFbUser() {
    this.fbUser = null;
    GlobalState.setState(UserObjectKeys.fbUser, null);
    this.fbProfile = null;
    GlobalState.setState(UserObjectKeys.fbProfile, null);
    superrequest.setAccessToken(null);
  }

  static useFbUserState(component) {
    GlobalState.useState(UserObjectKeys.fbUser, null, component);
  }

  // ---

  static setFbProfile(fbProfile) {
    this.fbProfile = fbProfile;
    GlobalState.setState(UserObjectKeys.fbProfile, fbProfile);
  }

  static clearFbProfile() {
    this.fbProfile = null;
    GlobalState.setState(UserObjectKeys.fbProfile, null);
  }

  static useFbProfileState(component) {
    GlobalState.useState(UserObjectKeys.fbProfile, null, component);
  }

  // ---

  static clearAllUserInfo() {
    this.clearUser();
    this.clearFbUser();
    this.clearFbProfile();
  }
}

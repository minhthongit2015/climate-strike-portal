import GlobalState from '../utils/GlobalState';
import superrequest from '../utils/superrequest';

export default class {
  static get FB() { return window.FB; }

  static getUserAvatar() {
    if (!GlobalState.user) {
      return null;
    }
    const fbID = GlobalState.user.authResponse.userID;
    return `https://graph.facebook.com/${fbID}/picture?type=square&width=200&height=200`;
  }

  static async checkLoginStatus() {
    this.FB.getLoginStatus((response) => {
      this.resolveLoginStatus(response);
      this.fetchUserProfile();
      this.getLoggedUser();
    });
  }

  static async fetchUserProfile() {
    const { user } = GlobalState;
    if (!user || !user.authResponse) {
      return null;
    }
    return new Promise((resolve, reject) => this.FB.api(
      user.authResponse.userID,
      (response) => {
        if (response && !response.error) {
          GlobalState.setState('profile', response);
          resolve(response);
        } else {
          reject(response.error);
        }
      }
    ));
  }

  static getLoggedUser() {
    const { user } = GlobalState;
    if (!user) {
      return GlobalState.setState('user2', null);
    }
    return superrequest.get('/api/v1/users/fbLogin')
      .then((foundUser) => {
        if (!GlobalState.user) {
          GlobalState.setState('user2', null);
          return;
        }
        if (GlobalState.user && foundUser && foundUser.ok) {
          GlobalState.setState('user2', foundUser.data);
        }
      });
  }

  static resolveLoginStatus(response) {
    if (response.status === 'connected') {
      GlobalState.setState('user', response);
      superrequest.accessToken = response.authResponse.accessToken;
    } else if (response.status === 'unauthorized') {
      GlobalState.setState('user', null);
      superrequest.accessToken = '';
    }
  }

  // additionalPermission: { /* scope: 'public_profile,email' */ }
  static async login(additionalPermissions) {
    return new Promise((resolve) => {
      this.FB.login((response) => {
        if (response.status === 'connected') {
          this.fetchUserProfile();
          this.getLoggedUser();
          resolve(true);
        } else {
          resolve(false);
        }
        this.resolveLoginStatus(response);
      }, additionalPermissions);
    });
  }

  static async logout() {
    return new Promise((resolve) => {
      GlobalState.setState('user', null);
      GlobalState.setState('user2', null);
      GlobalState.setState('profile', null);
      superrequest.accessToken = '';
      this.FB.logout((response) => {
        resolve(response);
      });
    });
  }

  static init() {
    window.fbAsyncInit = () => {
      const { FB } = window;
      FB.init({
        appId: '556670908405905',
        autoLogAppEvents: true,
        status: true,
        xfbml: true,
        cookie: true,
        version: 'v4.0'
      });

      this.checkLoginStatus();

      FB.AppEvents.logPageView();

      FB.Event.subscribe('xfbml.render', () => {
        console.log('finished rendering plugins');
        // const spinner = document.getElementById('spinner');
        // spinner.removeAttribute('style');
        // spinner.removeChild(spinner.childNodes[0]);
      });
    };

    // eslint-disable-next-line func-names
    (function (d, s, id) { // Load the SDK asynchronously
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}

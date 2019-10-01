import GlobalState from '../utils/GlobalState';

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
    });
  }

  static async fetchUserProfile() {
    const { user } = GlobalState;
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

  static resolveLoginStatus(response) {
    if (response.status === 'connected') {
      GlobalState.setState('user', response);
    } else if (response.status === 'unauthorized') {
      GlobalState.setState('user', null);
    }
  }

  // additionalPermission: { /* scope: 'public_profile,email' */ }
  static async login(additionalPermissions) {
    return new Promise((resolve) => {
      this.FB.login((response) => {
        if (response.status === 'connected') {
          resolve(true);
        } else {
          resolve(false);
        }
        this.resolveLoginStatus(response);
        this.fetchUserProfile();
      }, additionalPermissions);
    });
  }

  static async logout() {
    return new Promise((resolve) => {
      GlobalState.setState('user', null);
      GlobalState.setState('profile', null);
      this.FB.logout((response) => {
        resolve(response);
      });
    }).then(() => {
      this.dumpLoginStatus();
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

  static dumpLoginStatus() {
    this.FB.getLoginStatus((response) => {
      console.log(response);
    });
  }
}

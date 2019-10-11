const supperagent = require('superagent');
const graph = require('fbgraph');

module.exports = class {
  static async getUserByToken(accessToken) {
    if (!accessToken) return null;
    graph.setAccessToken(accessToken);
    return new Promise((resolve, reject) => {
      graph.get('me?fields=first_name,last_name,name,short_name', (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }

  static getServerAccessToken() {
    graph.getAccessToken();
  }

  static async refreshCache(url) {
    return supperagent.get('https://graph.facebook.com').query({
      id: url,
      scrape: true
    });
  }
};

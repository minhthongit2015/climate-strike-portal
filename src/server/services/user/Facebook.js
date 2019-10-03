const graph = require('fbgraph');

module.exports = class {
  static async getUserByToken(accessToken) {
    if (!accessToken) return null;
    graph.setAccessToken(accessToken);
    return new Promise((resolve, reject) => {
      graph.get('me', (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }
};

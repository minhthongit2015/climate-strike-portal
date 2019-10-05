const HttpErrors = require('http-errors');

module.exports = class {
  static onlyAuthorizedUser(req) {
    if (!req.session.user) {
      const error = HttpErrors.Unauthorized();
      delete error.stack;
      throw error;
    }
  }

  static onlyModerator(req) {
    this.onlyAuthorizedUser(req);
  }

  static isLogin(req) {
    return req.session && req.session.user;
  }

  static isAdmin(req) {
    if (!this.isLogin(req)) {
      return false;
    }
    return req.user.role === 'admin';
  }
};

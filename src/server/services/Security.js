

module.exports = class {
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

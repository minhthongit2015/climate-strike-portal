const HttpErrors = require('http-errors');
const { UserRole } = require('../utils/Constants');

function noStack(error) {
  delete error.stack;
  return error;
}

module.exports = class {
  static onlyAuthorizedUser(req) {
    if (!req.session.user) {
      throw noStack(HttpErrors.Unauthorized());
    }
  }

  static onlyRoleUser(req) {
    this.onlyAuthorizedUser(req);
    if (!req.session.user.role || typeof req.session.user.role !== 'string') {
      throw noStack(HttpErrors.Unauthorized());
    }
  }

  static onlyModerator(req) {
    this.onlyRoleUser(req);
    if (req.session.user.role !== UserRole.MODERATOR) {
      throw noStack(HttpErrors.Unauthorized());
    }
  }

  static onlyAdmin(req) {
    this.onlyRoleUser(req);
    if (req.session.user.role !== UserRole.ADMIN) {
      throw noStack(HttpErrors.Unauthorized());
    }
  }

  static onlyModOrAdmin(req) {
    this.onlyRoleUser(req);
    if (req.session.user.role !== UserRole.MODERATOR
      && req.session.user.role !== UserRole.ADMIN) {
      throw noStack(HttpErrors.Unauthorized());
    }
  }
};

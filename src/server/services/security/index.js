const HttpErrors = require('http-errors');
const { errorOrFalse, noStack } = require('./SecurityHelper');
const { UserRole } = require('../../utils/Constants');


module.exports = class {
  static onlyAuthorizedUser(req, throwError = true) {
    if (!req.session.user) {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }

  static onlyRoleUser(req, throwError = true) {
    if (!this.onlyAuthorizedUser(req, throwError)) {
      return false;
    }
    if (!req.session.user.role || typeof req.session.user.role !== 'string') {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }

  static onlyModerator(req, throwError = true) {
    if (!this.onlyRoleUser(req, throwError)) {
      return false;
    }
    if (req.session.user.role !== UserRole.MODERATOR) {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }

  static onlyAdmin(req, throwError = true) {
    if (!this.onlyRoleUser(req, throwError)) {
      return false;
    }
    if (req.session.user.role !== UserRole.ADMIN) {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }

  static onlyModOrAdmin(req, throwError = true) {
    if (!this.onlyRoleUser(req, throwError)) {
      return false;
    }
    if (req.session.user.role !== UserRole.MODERATOR
      && req.session.user.role !== UserRole.ADMIN) {
      return errorOrFalse(noStack(HttpErrors.Unauthorized()), throwError);
    }
    return true;
  }
};
